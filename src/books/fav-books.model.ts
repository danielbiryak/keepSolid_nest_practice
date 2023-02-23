import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Book } from "./books.model";


@Table({ tableName: 'favorite_books', updatedAt: false, createdAt: false })
export class FavoriteBook extends Model<FavoriteBook> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => Book)
    @Column({ type: DataType.INTEGER })
    bookId: number;
}