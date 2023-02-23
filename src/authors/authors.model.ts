import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/books/books.model';
import { BookAuthor } from './book-authors.model';

export interface AuthorCreationAttrs {
  name: string;
}

@Table({ tableName: 'authors', createdAt: false, updatedAt: false })
export class Author extends Model<Author, AuthorCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Book, () => BookAuthor)
  users: Book[];
}
