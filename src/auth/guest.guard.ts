import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// Interface para o usuário no request
interface JwtUser {
  userID: string;
  email: string;
  role: string;
}

@Injectable()
export class GuestGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Primeiro chama o GuestGuard padrão para validar JWT
    const isAuthenticated = (await super.canActivate(context)) as boolean;
    if (!isAuthenticated) {
      return false;
    }

    // Tipar o request do Express
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: JwtUser }>();
    const user = request.user;

    if (user.role !== 'guest' && user.role !== 'developer') {
      throw new UnauthorizedException(
        'Acesso permitido apenas para pessoas recém cadastradas.',
      );
    } else {
      return true;
    }
  }
}
