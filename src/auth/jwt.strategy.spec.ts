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
    it('should return a user object with userID and username', () => {
      const payload = { id: 7, username: 'Ari' };
      const validatedUser = jwtStrategy.validate(payload);
      
      expect(validatedUser).toEqual({ userID: payload.id, username: payload.username });
    });
  });
});