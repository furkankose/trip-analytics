import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO validate request
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
