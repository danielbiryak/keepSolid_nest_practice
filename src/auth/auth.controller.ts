import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserGuard } from './guards/createUser.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('registration')
  @ApiOperation({ summary: 'Registration of user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: String })
  @UseGuards(CreateUserGuard)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in of user' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJlbWFpbCI6ImdheTVAZ21haWwuY29tIiwiaWQiOjcsIn' +
        'JvbGVfbmFtZSI6IkFETUlOIiwiaWF0IjoxNjc2MjkyNjA0LCJleHAiOjE2NzYzNzkwMDR9' +
        '.847wQUAXh9Lh72JFWlP1QWgcO3I_RezqugzW7K1T3Zw',
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
