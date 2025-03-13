import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let configService: ConfigService;

    beforeEach(() => {
        configService = { get: jest.fn().mockReturnValue('test-secret') } as unknown as ConfigService;
        jwtStrategy = new JwtStrategy(configService);
    });

    it('should validate a user payload', async () => {
        const payload = { sub: 'user-id', username: 'testuser', roles: ['User*in'] };
        const result = await jwtStrategy.validate(payload);
        expect(result).toEqual({ userId: 'user-id', username: 'testuser', roles: ['User*in'] });
    });
});
