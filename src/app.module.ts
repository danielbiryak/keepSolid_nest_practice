import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { User } from './users/users.model';
import { GenresModule } from './genres/genres.module';
import { Book } from './books/books.model';
import { Genre } from './genres/genres.model';
import { BookAuthor } from './authors/book-authors.model';
import { BookGenre } from './genres/book-genres.model';
import { FavoriteBook } from './books/fav-books.model';
import { Author } from './authors/authors.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }),
    AuthModule,
    AuthorsModule,
    BooksModule,
    GenresModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Book, Genre, Author, BookAuthor, BookGenre, FavoriteBook],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
