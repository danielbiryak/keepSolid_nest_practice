import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

  async createAuthors(authorsNames: string[]) {
    const authors = await this.authorRepository.bulkCreate(
      authorsNames.map((value) => {
        return { name: value };
      }),
    );

    return authors;
  }
}
