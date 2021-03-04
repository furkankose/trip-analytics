import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { User } from './user.type';
import { users } from './user.data';

@Injectable()
export class UserService {
  private readonly users = users;

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
