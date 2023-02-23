import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate: User = await this.userService.getUserByEmail(
      userDto.email,
    );
    if (candidate) {
      throw new HttpException(
        { message: 'User with this email are already exists!' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    const user: User = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    const token: string = await this.generateToken(user);

    return { token };
  }

  async login(loginDto: LoginDto) {
    const user: User = await this.validateToken(loginDto);
    const token = await this.generateToken(user);
    return { token };
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role_name: user.role_name,
    };
    return this.jwtService.sign(payload);
  }
  private async validateToken(loginDto: LoginDto) {
    const user: User = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException({
        message: 'User with this email are not found!',
      });
    }
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect password or email' });
  }
}
