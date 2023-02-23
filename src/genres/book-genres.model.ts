import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "src/books/books.model";
import { Genre } from "./genres.model";

@Table({ tableName: 'book_genres', updatedAt: false, createdAt: false })
export class BookGenre extends Model<BookGenre> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Genre)
    @Column({ type: DataType.INTEGER })
    genreId: number;

    @ForeignKey(() => Book)
    @Column({ type: DataType.INTEGER })
    bookId: number;
}