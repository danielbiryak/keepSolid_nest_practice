import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/users/user-roles.enum';
import { User } from 'src/users/users.model';

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      req.body.role_name = UserRoles.USER;
      return true;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      req.body.role_name = UserRoles.USER;
      return true;
    }
    try {
      const user = this.jwtService.verify<User>(token);
      if (user.role_name !== UserRoles.ADMIN) {
        req.body.role_name = UserRoles.USER;
        return true;
      }
      return true;
    } catch (error) {
      console.error(error);
      req.body.role_name = UserRoles.USER;
      return true;
    }
  }
}
