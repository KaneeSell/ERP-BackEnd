import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: LoginDto): Promise<{
    access_token: string;
    user: { id: string; email: string; role: Role };
  } | void> {
    console.log(
      `Login: { email: ${data.email}, data: ${new Date().toLocaleDateString()}, hora: ${new Date().toLocaleTimeString()} }`,
    );
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      const passwordValid = await bcrypt.compare(
        data.password,
        userExists.password,
      );
      if (passwordValid) {
        const payload = {
          email: userExists.email,
          sub: userExists.id,
          role: userExists.role,
        };
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            id: payload.sub.toString(),
            email: payload.email,
            role: payload.role,
          },
        };
      } else {
        console.log('Senha inválida.');
        throw new UnauthorizedException('Senha inválida.');
      }
    } else {
      console.log('Email inválido.');
      throw new UnauthorizedException('Email inválido.');
    }
  }
}
