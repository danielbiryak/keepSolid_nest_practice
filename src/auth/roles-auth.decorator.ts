import { SetMetadata } from '@nestjs/common/decorators';
import { UserRoles } from '../users/user-roles.enum';

export const ROLES_KEY = 'roles';

export const PermittedRoles = (...roles: UserRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
