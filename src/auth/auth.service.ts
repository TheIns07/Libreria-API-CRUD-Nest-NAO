import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) 
        private authRepository: Repository<Auth>,
        private jwtAuthService: JwtService
      ) {}

      async register(userObject: RegisterAuthDTO): Promise<Auth>{
        const {password} = userObject
        const plainToHash = await hash(password, 10);

        userObject = {...userObject, password:plainToHash}
        return this.authRepository.save(userObject)

      }

      async login(userObject: LoginAuthDTO): Promise<{ user: Auth; token: string }>{
        const {username, password} = userObject;
        const findUser = await this.authRepository.findOne({where: {username}})

        if(!findUser) throw new HttpException('User not found', HttpStatus.FORBIDDEN);
        const checkPassword = await compare(password, findUser.password);
        
        if(!checkPassword) throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN);

        const data = {
          user: findUser,
          token: this.jwtAuthService.sign({id:findUser.id, username:findUser.username})
        }

        return data;

      }

      async findAllUsers(): Promise<Auth[]> {
        return this.authRepository.find();
      }
    
}
