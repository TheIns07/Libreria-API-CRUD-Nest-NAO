import { Test, TestingModule } from '@nestjs/testing';
import { JWTStrategy } from './jwt.strategy';

describe('JWTStrategy', () => {
  let jwtStrategy: JWTStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JWTStrategy],
    }).compile();

    jwtStrategy = module.get<JWTStrategy>(JWTStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return a user object with userID and username', async () => {
      const payload = { username: 'Ari', password: '92ehwjn' };
      const validatedUser = await jwtStrategy.validate(payload);

      expect(validatedUser).toEqual({
        username: payload.username,
        password: payload.password,
      });
    });
  });
});
