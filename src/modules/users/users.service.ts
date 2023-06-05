import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    return newUser;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findByEmail(email: string) {
    const user = this.usersRepository.findByEmail(email);
    return user;
  }
  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.delete(id);
  }
}
