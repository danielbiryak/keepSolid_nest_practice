import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ParseEnumPipe, ParseIntPipe } from '@nestjs/common/pipes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermittedRoles } from 'src/auth/roles-auth.decorator';
import { Book } from 'src/books/books.model';
import { UserRoles } from './user-roles.enum';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Get all available users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('favorite-books')
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN, UserRoles.USER)
  @ApiOperation({ summary: 'Get all favorite books of user by user id' })
  @ApiResponse({ status: HttpStatus.OK, type: [Book] })
  getUserFavoriteBooks(@Req() req) {
    return this.userService.getUserFavoriteBooks(+req.user.id);
  }

  @Patch('role-change')
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Change user role' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  changeUserRole(
    @Body('id', ParseIntPipe) id: number,
    @Body('role', new ParseEnumPipe(UserRoles)) role: keyof typeof UserRoles,
  ) {
    return this.userService.changeUserRole(id, role);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Delete user by his email address' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  deleteUserByEmail(@Body('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }

  @Post('favorite-books/:id')
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.USER, UserRoles.ADMIN)
  @ApiOperation({ summary: 'Add book by id to user favorite books list' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Book })
  addFavoriteBook(@Param('id') bookId: number, @Req() req) {
    return this.userService.addFavoriteBook(+req.user.id, +bookId);
  }

  @Delete('favorite-books/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.USER, UserRoles.ADMIN)
  @ApiOperation({ summary: 'Add book by id to user favorite books list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  deleteFavoriteBook(@Param('id') bookId: number, @Req() req) {
    return this.userService.deleteFavoriteBook(+req.user.id, +bookId);
  }
}
