import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from 'src/base.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>
  ) {
    super(repository);
  }

  getUser(username): User | any {
    try {
      return this.repository.findOne({
        where: [
          {
            username
          },
          // {
          //     slug: term
          // }
        ],
      });
    } catch (error) {
      throw new BadRequestException('Invalid user');

    }

  }
}
