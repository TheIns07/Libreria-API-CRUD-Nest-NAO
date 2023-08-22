import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { UserDTO } from 'src/users/models/User.dto';
import { RegisterAuthDTO } from './models/registerAuth.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    /*async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.listUserByUsername(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }*/

      async register (userObject: RegisterAuthDTO){
        const {password} = userObject;
        const convertToHash = await hash(password, 10); 
        userObject = {...userObject, password: convertToHash}
        return this.usersService.createUser(userObject);
      }
}
