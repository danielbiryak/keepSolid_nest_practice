import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BooksService } from 'src/books/books.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UserRoles } from './user-roles.enum';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private bookService: BooksService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return users;
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
  async createUser(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);

    return user;
  }

  async deleteUserByEmail(email: string) {
    const user: User = await this.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException({
        message: 'There is no user with this email',
      });
    }

    await user.destroy();
    return {
      message: `User with email ${email} have been deleted successfully`,
    };
  }

  async addFavoriteBook(userid: number, bookId: number) {
    const book = await this.bookService.getBookById(bookId);
    if (!book) {
      throw new NotFoundException({
        message: 'There are no book with this id',
      });
    }

    const user = await this.userRepository.findOne({ where: { id: userid } });

    if (await user.$has('books', book.id)) {
      throw new HttpException(
        { message: 'This book is already added to favorites' },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.$add('books', book.id);
    return book;
  }

  async getUserFavoriteBooks(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const books = await user.$get('books');
    return books;
  }

  async deleteFavoriteBook(userid: number, bookId: number) {
    const user = await this.userRepository.findOne({ where: { id: userid } });

    const [book] = await user.$get('books', { where: { id: bookId } });

    if (!book) {
      throw new NotFoundException({
        message: 'There are no book with this id',
      });
    }
    await user.$remove('books', bookId);

    return book;
  }

  async changeUserRole(userId: number, newRole: keyof typeof UserRoles) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException({
        message: 'There is no user with this email',
      });
    }
    user.role_name = newRole;
    await user.save();

    return user;
  }
}
