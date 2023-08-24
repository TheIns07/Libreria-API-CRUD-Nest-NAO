import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from './jwtConstants';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
