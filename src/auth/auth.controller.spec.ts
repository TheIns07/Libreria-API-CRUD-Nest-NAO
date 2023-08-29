import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { Auth } from './auth.entity';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    findAllUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a user', async () => {
      const userObject: RegisterAuthDTO = {
        name: 'Ariadna',
        username: "Ari YuEx",
        password: "arianaGD!!!!"
      };

      const createdUser = { ...userObject }; 
      jest.spyOn(mockAuthService, 'register').mockResolvedValue(createdUser);

      const result = await controller.registerUser(userObject);

      expect(result).toBe(createdUser);
      expect(mockAuthService.register).toHaveBeenCalledWith(userObject);
    });
  });

  describe('loginUser', () => {
    it('should log in a user', async () => {
      const userObject: LoginAuthDTO = {
        username: "Ari YuEx",
        password: "arianaGD!!!!"
      };

      const loggedInUser = { ...userObject };
      jest.spyOn(mockAuthService, 'login').mockResolvedValue(loggedInUser);

      const result = await controller.loginUser(userObject);

      expect(result).toBe(loggedInUser);
      expect(mockAuthService.login).toHaveBeenCalledWith(userObject);
    });
  });

  describe('findAllUsers', () => {
    it('should return a list of users', async () => {
      const users: Auth[] = [
        {
          id: 1,
          name: 'Ariadna',
          username: "Ari YuEx",
          password: "arianaGD!!!!",
          booksReserved: null
        },
        {
          id: 1,
          name: 'Ariadna',
          username: "Ari YuEx",
          password: "arianaGD!!!!",
          booksReserved: null
        },
        {
          id: 1,
          name: 'Ariadna',
          username: "Ari YuEx",
          password: "arianaGD!!!!",
          booksReserved: null
        }
      ];
      jest.spyOn(mockAuthService, 'findAllUsers').mockResolvedValue(users);

      const result = await controller.findAllUsers();

      expect(result).toBe(users);
      expect(mockAuthService.findAllUsers).toHaveBeenCalled();
    });
  });
});
