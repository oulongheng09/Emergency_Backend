import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('me')
    me(@Headers('authorization') authorization: string) {
    const token = authorization?.replace('Bearer ','',);
    return this.authService.getMe(token);
    }
}