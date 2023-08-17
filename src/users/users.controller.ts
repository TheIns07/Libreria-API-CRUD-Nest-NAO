import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { UserDTO } from './models/User.dto';
import { User } from './User.entity';
import { UsersService } from './users.service';
import { UserUpdate } from './models/UserUpdate.dto';

@Controller('users')
export class UsersController {


    constructor(private usersService: UsersService){}
    @Post()
    createUser(@Body() newUser: UserDTO): Promise<User>{
        return this.usersService.createUser(newUser);
    }

    @Get()
    listUsers(): Promise<User[]>{
        return this.usersService.listUsers();
    }

    @Get(':username')
    listUser (@Param('username') username: string): Promise<User>{
        return this.usersService.listUserByUsername(username);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateUser(@Param(('id'), ParseIntPipe) id: number, @Body() book: UserUpdate){
        return this.usersService.updateUser(id, book);
    }
}
