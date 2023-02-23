import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './genres.model';
import { GenresService } from './genres.service';

@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
