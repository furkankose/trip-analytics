import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { LoginRequestDTO } from './dtos/loginRequest.dto';
import { LoginResponseDTO } from './dtos/loginResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'Bearer token',
    type: LoginResponseDTO,
  })
  @ApiBody({
    type: LoginRequestDTO,
    description: 'Credentials that are needed to be able to login',
    required: true,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDTO> {
    return this.authService.login(req.user);
  }
}
