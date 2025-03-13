import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';

describe('LocalStrategy', () => {
    let localStrategy: LocalStrategy;
    let authService: AuthService;

    beforeEach(() => {
        authService = { validateUser: jest.fn() } as unknown as AuthService;
        localStrategy = new LocalStrategy(authService);
    });

    it('should validate a user', async () => {
        jest.spyOn(authService, 'validateUser').mockResolvedValue({ username: 'testuser' });

        const result = await localStrategy.validate('testuser', 'password');
        expect(result).toEqual({ username: 'testuser' });
    });

    it('should throw an error if validation fails', async () => {
        jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

        await expect(localStrategy.validate('wronguser', 'wrongpass')).rejects.toThrow('Ungültige Zugangsdaten');
    });
});
