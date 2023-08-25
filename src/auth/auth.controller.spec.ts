import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { Auth } from './auth.entity';
import { LoginAuthDTO } from './dto/loginAuth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a user', async () => {
      const userObject: RegisterAuthDTO = {
        username: "Ari YuEx",
        name: "Ariadna",
        password: "arianaGD!!!!"
      };

      const registered: Auth = {
        id: 4,
        name: 'Ariadna',
        username: "Ari YuEx",
        password: "arianaGD!!!!",
        booksReserved: null
      };

      jest.spyOn(authService, 'register').mockResolvedValue(registered);

      expect(await controller.registerUser(userObject)).toBe(registered);
    });
  });

  describe('login', () => {
    it('should get a user for a registered one', async () => {

      const userObject: LoginAuthDTO = {
        username: "Ari YuEx",
        password: "arianaGD!!!!"
      };

      const loginUser: Auth = {
        id: 4,
        name: 'Ariadna',
        username: "Ari YuEx",
        password: "arianaGD!!!!",
        booksReserved: null
      };

      jest.spyOn(authService, 'login').mockResolvedValue({
        user: loginUser,
        token: "3irn3i0fnw0ifnem0ofinm3e0kfnp"
      });

      expect(await controller.loginUser(userObject)).toBe(loginUser);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const allUsers: Auth[] = [];
      allUsers.push({
        id: 4,
        username: "Jose",
        password: "9rfueifn",
        name: "reiurnfe",
        booksReserved: null
      },
        {
          id: 6,
          username: "GGG",
          password: "234r32r",
          name: "Golovkin",
          booksReserved: null
        },
        {
          id: 8,
          username: "Madden",
          password: "3cd_2edw22",
          name: "John Madden",
          booksReserved: null
        }
      )

      jest.spyOn(authService, 'findAllUsers').mockResolvedValue(allUsers);

      expect(await controller.findAllUsers()).toBe(allUsers);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
