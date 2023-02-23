import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './genres.model';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre) private genreRepository: typeof Genre) {}
  async getAllGenres() {
    const genres = await this.genreRepository.findAll();

    return genres;
  }

  async createGenres(genresNames: string[]) {
    const genres = await this.genreRepository.bulkCreate(
      genresNames.map((val) => {
        return { name: val };
      }),
    );

    return genres;
  }

  async findGenreByName(genreName: string) {
    const genre = await this.genreRepository.findOne({
      where: { name: genreName },
    });

    return genre;
  }
}
