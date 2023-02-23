import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { GenresModule } from 'src/genres/genres.module';
import { BooksController } from './books.controller';
import { Book } from './books.model';
import { BooksService } from './books.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Book]),
    forwardRef(() => GenresModule),
    forwardRef(() => AuthorsModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
