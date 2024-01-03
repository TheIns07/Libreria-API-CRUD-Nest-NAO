import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: Repository<Auth>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Auth),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<Repository<Auth>>(getRepositoryToken(Auth));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const userObject: RegisterAuthDTO = {
        name: 'Ariadna',
        username: 'Ari YuEx',
        password: 'arianaGD!!!!',
      };

      const hashedPassword = await hash(userObject.password, 10);
      const userWithHashedPassword = {
        ...userObject,
        password: hashedPassword,
        id: 1,
        booksReserved: null,
      };
      const createdUser = { ...userWithHashedPassword };

      jest.spyOn(authRepository, 'save').mockResolvedValue(createdUser);

      const result = await service.register(userObject);

      expect(result).toBe(createdUser);
      expect(authRepository.save).toHaveBeenCalledWith(userWithHashedPassword);
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const userObject: LoginAuthDTO = {
        username: 'Ari YuEx',
        password: 'arianaGD!!!!',
      };

      const findUser = {
        ...userObject,
        id: 1,
        booksReserved: null,
        name: 'Ariadna',
      };
      const token = 'fake-token';

      jest.spyOn(authRepository, 'findOne').mockResolvedValue(findUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(userObject);

      expect(result.user).toBe(findUser);
      expect(result.token).toBe(token);
    });

    it('should throw HttpException when user not found', async () => {
      const userObject: LoginAuthDTO = {
        username: 'Ari YuEx',
        password: 'arianaGD!!!!',
      };

      jest.spyOn(authRepository, 'findOne').mockResolvedValue(null);

      await expect(service.login(userObject)).rejects.toThrowError(
        new HttpException('User not found', HttpStatus.FORBIDDEN),
      );
    });

    it('should throw HttpException when password is incorrect', async () => {
      const userObject: LoginAuthDTO = {
        username: 'Ari YuEx',
        password: 'arianaGD!!!!',
      };

      const findUser = {
        ...userObject,
        id: 1,
        booksReserved: null,
        name: 'Ariadna',
      };

      jest.spyOn(authRepository, 'findOne').mockResolvedValue(findUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      await expect(service.login(userObject)).rejects.toThrowError(
        new HttpException('Password incorrect', HttpStatus.FORBIDDEN),
      );
    });
  });
});
