import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Post, Body, Get } from '@nestjs/common';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { Auth } from './auth.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    registerUser(@Body() userObject: RegisterAuthDTO){
        return this.authService.register(userObject);
    }

    @Post('login')
    loginUser(@Body() userObjectLogin: LoginAuthDTO){
        return this.authService.login(userObjectLogin)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('users')
    async findAllUsers(): Promise<Auth[]> {
        return this.authService.findAllUsers();
    }
}
