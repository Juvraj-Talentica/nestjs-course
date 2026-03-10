import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'EMPLOYEE' },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'MANAGER' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'INTERN' },
        { id: 4, name: 'Diana', email: 'diana@example.com', role: 'EMPLOYEE' },
        { id: 5, name: 'Eve', email: 'eve@example.com', role: 'MANAGER' },
    ]

    findAll(role?: 'INTERN' | 'EMPLOYEE' | 'MANAGER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }   
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }   

    create(createUserDto: CreateUserDto) {
        const highestId = this.users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
        const newUser = { id: highestId + 1, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    } 

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);  
        if (!user) {
            return null;
        }
        Object.assign(user, updateUserDto);
        return user;
    }

    delete(id: number) {
        const deletedUser = this.findOne(id);
        if (!deletedUser) {
            return null;
        }
        this.users = this.users.filter(user => user.id !== id);
        return deletedUser;
    }

}
