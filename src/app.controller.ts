import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  // @UseGuards(AuthGuard(['local', 'admin']))

  @UseGuards(AuthGuard('local'))
  @Post('candidate/login')
  async login(@Request() req) {
    return this.authService.login(req.user, 'candidate');
  }

  @UseGuards(AuthGuard('admin'))
  @Post('recruiter/login')
  async recruiterLogin(@Request() req) {
    return this.authService.login(req.user, 'recruiter');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
