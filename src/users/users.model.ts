import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/books/books.model';
import { FavoriteBook } from 'src/books/fav-books.model';
import { UserRoles } from './user-roles.enum';

export interface UserCreationAttrs {
  email: string;
  password: string;
  role_name: keyof typeof UserRoles;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({
    example: '1',
    description: 'User id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User email address',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: '123456789',
    description: 'User account password',
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'USER',
    enum: UserRoles,
    description: 'User role',
  })
  role_name: keyof typeof UserRoles;

  @BelongsToMany(() => Book, () => FavoriteBook)
  books: Book[];
}
