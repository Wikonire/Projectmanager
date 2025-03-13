import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../repositories/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';

jest.mock('bcrypt', () => ({
    compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findOneByUsername: jest.fn().mockResolvedValue({
                            id: 'user-id',
                            username: 'testuser',
                            email: 'testuser@example.com',
                            password: 'hashedpassword', // Simulierter gehashter Wert
                            createdAt: new Date(),
                            roles: [
                                {
                                    id: 'role-id',
                                    name: 'User*in',
                                    description: 'Standardrolle für alle mit einem aktiven Account.',
                                    users: [],
                                },
                            ],
                            normalizeEmail: jest.fn(),
                            hashPassword: jest.fn(),
                        } as UserEntity),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mock_token'),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should validate a user', async () => {
        const user = await authService.validateUser('testuser', 'password');
        expect(user).toHaveProperty('username', 'testuser');
    });

    it('should throw an error if user is not found', async () => {
        jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(null);

        await expect(authService.validateUser('invaliduser', 'password')).rejects.toThrow('Ungültige Zugangsdaten');
    });

    it('should generate a JWT token', async () => {
        const user = { username: 'testuser', id: 'user-id', roles: ['User*in'] };
        const result = await authService.login(user);

        expect(result).toEqual({ access_token: 'mock_token' });
        expect(jwtService.sign).toHaveBeenCalledWith({ username: 'testuser', sub: 'user-id', roles: ['User*in'] });
    });
});
