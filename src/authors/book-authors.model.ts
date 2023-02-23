import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "src/books/books.model";
import { Author } from "./authors.model";

@Table({ tableName: 'book_authors', updatedAt: false, createdAt: false })
export class BookAuthor extends Model<BookAuthor> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Author)
    @Column({ type: DataType.INTEGER })
    authorId: number;

    @ForeignKey(() => Book)
    @Column({ type: DataType.INTEGER })
    bookId: number;
}