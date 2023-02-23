import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { appendFile, writeFile, unlink } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { AuthorsService } from 'src/authors/authors.service';
import { GenresService } from 'src/genres/genres.service';
import { Book } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { Genre } from 'src/genres/genres.model';
import { Author } from 'src/authors/authors.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private bookRepository: typeof Book,
    private genresService: GenresService,
    private authorsService: AuthorsService,
  ) {}

  async getAllBooks() {
    const books: Book[] = await this.bookRepository.findAll();

    return books;
  }
  async getBookById(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });

    return book;
  }

  async getBookInfoById(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id },
      include: [
        { model: Genre, attributes: ['name'] },
        { model: Author, attributes: ['name'] },
      ],
    });
    if (!book) {
      throw new NotFoundException({
        message: "Book with this id isn't exist",
      });
    }
    const resultBook = {
      id: book.id,
      name: book.name,
      description: book.description,
    };

    const [genres, authors] = await Promise.all([
      book.genres.map((val) => val.name),
      book.authors.map((val) => val.name),
    ]);

    return { ...resultBook, genres, authors };
  }

  async createBook(bookDto: CreateBookDto) {
    const book = await this.bookRepository.create({
      name: bookDto.name,
      description: bookDto.description,
    });

    const genres = await this.genresService.createGenres(bookDto.genres);
    const genresIds = genres.map((value) => value.id);
    await book.$set('genres', [...genresIds]);
    book.genres = genres;

    const authors = await this.authorsService.createAuthors(bookDto.authors);
    const authorsIds = authors.map((value) => value.id);
    await book.$set('authors', [...authorsIds]);
    book.authors = [...authors];

    return book;
  }

  async deleteBookById(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException({
        message: `There are no books with this id`,
      });
    }
    await book.destroy();

    return;
  }

  async createCsv() {
    const fullPath: string = `${__dirname}/data/`;
    const fileName: string = 'export.csv';
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath);
    }
    await writeFile(fullPath + fileName, 'name,genres,authors,description');
    const books = await this.bookRepository.findAll({ include: { all: true } });

    await Promise.all(
      books.map(async (book) => {
        const [genres, authors] = await Promise.all([
          book.genres.map((val) => val.name),
          book.authors.map((val) => val.name),
        ]);

        await appendFile(
          fullPath + fileName,
          `\n${book.name},[${genres}],[${authors}],${book.description}`,
        );
      }),
    );
    this.deleteExportData(fullPath + fileName);
    return;
  }
  private async deleteExportData(filePath: string) {
    setTimeout(() => {
      unlink(filePath);
    }, 10 * 10 ** 3);
  }
}
