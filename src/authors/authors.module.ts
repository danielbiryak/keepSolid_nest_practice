import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { AuthorsService } from './authors.service';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
