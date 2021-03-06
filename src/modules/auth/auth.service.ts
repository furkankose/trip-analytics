import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // TODO add return type
  async validateUser(username: string, password: string) {
    const {
      password: hashedPassword,
      ...user
    } = await this.userService.findByUsername(username);

    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new HttpException(
        'Username or password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  // TODO add return type
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.TA_JWT_SECRET_KEY,
      }),
    };
  }
}
