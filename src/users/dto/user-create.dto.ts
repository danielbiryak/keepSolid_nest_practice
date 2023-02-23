import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../user-roles.enum';
import { UserCreationAttrs } from '../users.model';

export class CreateUserDto implements UserCreationAttrs {
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
  @ApiProperty({
    example: 'USER',
    enum: UserRoles,
    description: 'User role',
  })
  readonly role_name: keyof typeof UserRoles;
}
