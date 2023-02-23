import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User email address',
  })
  readonly email: string;
  @ApiProperty({
    example: '123456789',
    description: 'User account password',
  })
  readonly password: string;
}
