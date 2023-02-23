import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from 'src/authors/authors.model';
import { BookAuthor } from 'src/authors/book-authors.model';
import { BookGenre } from 'src/genres/book-genres.model';
import { Genre } from 'src/genres/genres.model';
import { User } from 'src/users/users.model';
import { FavoriteBook } from './fav-books.model';

interface BookCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: '1', description: 'Book id' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    description: 'Book name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example:
      'Harry Potter is an orphan whom Rowling imagined as a "scrawny, black-haired,' +
      "green eyed and bespectacled boy who didn't know he was a wizard",
    description: 'Book description',
  })
  description: string;

  @BelongsToMany(() => User, () => FavoriteBook)
  users: User[];

  @BelongsToMany(() => Genre, () => BookGenre)
  genres: Genre[];

  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Author[];
}
