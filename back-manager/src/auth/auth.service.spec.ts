import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../repositories/users.service';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../repositories/role.service';
import {UnauthorizedException} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import {EmployeeEntity} from '../entities/employee.entity';

export const mockResolveCompare= jest.fn();
export const password = 'password';

jest.mock('bcrypt', () => ({
    compare: jest.fn().mockResolvedValue(true), // Stellt sicher, dass compare eine gültige Funktion ist
    hash: jest.fn().mockResolvedValue('hashedPassword'), // Falls nötig
}));

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;
    let roleService: RoleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findOneByUsername: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mock_token'),
                    },
                },
                {
                    provide: RoleService,
                    useValue: {
                        findOne: jest.fn().mockResolvedValue({
                            id: 'role-id',
                            name: 'User*in',
                            description: 'Standardrolle',
                        }),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
        roleService = module.get<RoleService>(RoleService);
    });


    it('should validate a user and return user data without password', async () => {
        const roles: RoleEntity[] = [
            {
                id: 'role-id',
                name: 'User*in',
                description: 'Standardrolle',
                users: [],
            },
            {
                id: 'role-id2',
                name: 'Admin',
                description: 'Standardrolle',
                users: [],
            }
        ];

        const user: UserEntity = {
            employee: {} as EmployeeEntity,
            async hashPassword(): Promise<void> {
                return Promise.resolve(undefined);
            },
            normalizeEmail: jest.fn(),
            id: 'user-id',
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            createdAt: new Date(),
            roles,
        };

        jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(user);
        mockResolveCompare.mockResolvedValue(true);

        const validatedUser = await authService.validateUser('testuser', 'password');
        expect(validatedUser).toEqual(expect.objectContaining({
            id: 'user-id',
            employees: [],
            username: 'testuser',
            email: 'test@example.com',
            createdAt: expect.any(Date),
            role: expect.any(Object),
        }));
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
        jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(null);

        await expect(authService.validateUser('wronguser', 'password'))
            .rejects.toThrow(UnauthorizedException);
    });

    it('should return a JWT token upon successful login', async () => {
          const hashPassword =jest.fn();
        const normalizeEmail =jest.fn();
        const roles: RoleEntity[] = [
            {
                id: 'role-id',
                name: 'User*in',
                description: 'Standardrolle',
                users: [],
            },
            {
                id: 'role-id2',
                name: 'Admin',
                description: 'Adminrolle',
                users: [],
            }
        ];
        const user: UserEntity = {
            employee: {} as EmployeeEntity,
            id: 'user-id',
            hashPassword,
            normalizeEmail,
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            createdAt: new Date(),
            roles
        };

        jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(user);
        mockResolveCompare.mockResolvedValue(true);

        const result = await authService.login({ username: 'testuser', password: 'password' });

        expect(result).toEqual({ access_token: 'mock_token' });
        expect(jwtService.sign).toHaveBeenCalledWith({
            username: 'testuser',
            sub: 'user-id',
            roles: [{id: "role-id", name:"User*in", description:"Standardrolle"}],
        });
    });

    it('should throw UnauthorizedException if roles are missing', async () => {
        const user: UserEntity = {
            normalizeEmail(): void {
            },
            employee: {} as EmployeeEntity,
            async hashPassword(): Promise<void> {
                return Promise.resolve(undefined);
            },
            id: 'user-id',
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            createdAt: new Date(),
            roles: [{
                name: 'Admin', description: 'description',
                id: '',
                users: []
            }]
        };

        jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(user);
        jest.spyOn(roleService, 'findOne').mockResolvedValue(Promise.reject(new UnauthorizedException('Ungültige Rolleninformationen')));
        mockResolveCompare.mockResolvedValue(true);

        await expect(authService.login({ username: 'testuser', password: 'password' }))
            .rejects.toThrow(new UnauthorizedException('Ungültige Rolleninformationen'));
    });

    it('should throw UnauthorizedException if user information is incomplete', async () => {
        const roles: RoleEntity[] =[ {
            id: 'role-id',
            name: 'User*in',
            description: 'Standardrolle',
            users: [],
        }];

        const user = Object.assign(new UserEntity(), {
            id: 'user-id',
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            createdAt: new Date(),
            roles,
        });
        mockResolveCompare.mockResolvedValue(false);
        jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(user);

        await expect(authService.login({ username: '', password: 'password' }))
            .rejects.toThrow(new UnauthorizedException('Ungültige Benutzerinformationen'));

        user.id = '';
        await expect(authService.login({ username: 'testuser', password: 'password' }))
            .rejects.toThrow(new UnauthorizedException('Ungültige Benutzerinformationen'));
    });
});
