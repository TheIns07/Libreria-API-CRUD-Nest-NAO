import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './models/User.dto';
import { UserUpdate } from './models/UserUpdate.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    createUser(user: UserDTO){
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    listUsers(){
        return this.userRepository.find();
    }

    listUserByID(id: number){
        return this.userRepository.findOne({ where:{ id: id}});
    }

    deleteUser(id: number){
        return this.userRepository.delete({id: id});
    }

    updateUser(id: number, book: UserUpdate){
        return this.userRepository.update({id: id}, book);
    }
}
