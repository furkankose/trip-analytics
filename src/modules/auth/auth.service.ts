import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { User } from '../user/user.type';
import { LoginResponseDTO } from './dtos/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
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

  async login(user: User): Promise<LoginResponseDTO> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.TA_JWT_SECRET_KEY,
      }),
    };
  }
}
