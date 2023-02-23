import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermittedRoles } from 'src/auth/roles-auth.decorator';
import { UserRoles } from 'src/users/user-roles.enum';
import { Book } from './books.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all available books' })
  @ApiResponse({ status: HttpStatus.OK, type: [Book] })
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('download-list')
  @ApiOperation({
    summary: 'Download list of all available books in .csv format',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN)
  async download(@Res() res: Response) {
    await this.booksService.createCsv();

    return res.download(`${__dirname}/data/export.csv`);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by provided id' })
  @ApiResponse({ status: HttpStatus.OK, type: Book })
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookInfoById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Creates book by provided information about it' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Book })
  createBook(@Body() bookDto: CreateBookDto) {
    return this.booksService.createBook(bookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletes book by provided id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(AuthGuard)
  @PermittedRoles(UserRoles.ADMIN)
  deleteBookById(@Param('id') id: number) {
    return this.booksService.deleteBookById(+id);
  }
}
