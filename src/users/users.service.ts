import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './models/User.dto';
import { UserUpdate } from './models/UserUpdate.dto';
import { RegisterAuthDTO } from 'src/auth/models/registerAuth.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    createUser(user: RegisterAuthDTO){
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    listUsers(){
        return this.userRepository.find();
    }

    listUserByUsername(username: string){
        return this.userRepository.findOne({ where:{ username: username}});
    }

    deleteUser(id: number){
        return this.userRepository.delete({id: id});
    }

    updateUser(id: number, book: UserUpdate){
        return this.userRepository.update({id: id}, book);
    }
}
