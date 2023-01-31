import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user/createUser.dto';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.save(body);

    return user;
  }
}
