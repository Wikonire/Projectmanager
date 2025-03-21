import { Test, TestingModule } from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';



describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockResolvedValue({ access_token: 'mock_token' }),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    it('should return a token on login', async () => {
        const req = { user: { username: 'testuser', password: 'testpass' } };
        const result = await authController.login(req.user);
        expect(result).toEqual({ access_token: 'mock_token' });
        expect(authService.login).toHaveBeenCalledWith(req.user);
    });
});
