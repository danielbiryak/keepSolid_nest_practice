import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    description: 'Book name',
  })
  readonly name: string;
  @ApiProperty({
    example: ['Fantasy'],
    description: 'Book genres',
  })
  readonly genres: string[];
  @ApiProperty({
    example: ['J. K. Rowling'],
    description: 'Book authors',
  })
  readonly authors: string[];
  @ApiProperty({
    example:
      'Harry Potter is an orphan whom Rowling imagined as a "scrawny, black-haired,' +
      "green eyed and bespectacled boy who didn't know he was a wizard",
    description: 'Book description',
  })
  readonly description: string;
}
