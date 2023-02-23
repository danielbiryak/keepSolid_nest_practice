import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/books/books.model';
import { BookGenre } from './book-genres.model';

export interface GenreCreationAttrs {
  name: string;
}

@Table({ tableName: 'genres', createdAt: false, updatedAt: false })
export class Genre extends Model<Genre, GenreCreationAttrs> {
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

  @BelongsToMany(() => Book, () => BookGenre)
  users: Book[];
}
