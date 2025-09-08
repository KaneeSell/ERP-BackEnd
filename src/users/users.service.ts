import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '../../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUserDto } from './dto/change-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<string> {
    console.log(
      `criando usuario: { name: ${data.name}, email: ${data.email}, data: ${new Date().toLocaleDateString()}, hora: ${new Date().toLocaleTimeString()} }`,
    );
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      console.log('email ja existe.');
      throw new BadRequestException('Este E-mail já está cadastrado.');
    }
    const salt = 10;
    const passwordHashed = await bcrypt.hash(data.password, salt);
    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHashed,
      },
    });
    return 'Usuário criado com sucesso!';
  }

  async changeUser(id: number, data: ChangeUserDto): Promise<string> {
    console.log(
      `editando usuario: { name: ${data.name}, email: ${data.email}, data: ${new Date().toLocaleDateString()}, hora: ${new Date().toLocaleTimeString()} }`,
    );
    const userExists = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!userExists) {
      console.log('usuario não existe.');
      throw new BadRequestException('Este usuario não existe.');
    }
    const confirmPass = await bcrypt.compare(
      data.password,
      userExists.password,
    );
    if (!confirmPass) {
      throw new BadRequestException(
        'Senha incorreta para alteração do usuario.',
      );
    }
    await this.prisma.user.update({
      where: { id: id },
      data: {
        id: id,
        name: data.name,
        email: data.email,
        password: userExists.password,
      },
    });
    return 'Usuário criado com sucesso!';
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log(`buscando usuario por email: { email: ${email} }`);
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    lastLogin: Date | null;
    isActive: boolean;
    role: Role;
  } | null> {
    console.log(`buscando usuario por ID: { id: ${id} }`);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado!');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive,
      role: user.role,
    };
  }

  async findAll(): Promise<User[] | null> {
    console.log('findAll...');
    console.log(`buscando todos usuarios...`);
    return await this.prisma.user.findMany();
  }

  async changePassword(
    id: number,
    data: ChangePasswordDto,
  ): Promise<string | void> {
    console.log(`changePassword: { id: ${id} }`);
    const userExists = await this.prisma.user.findUnique({ where: { id: id } });
    if (userExists) {
      const oldPasswordValid = await bcrypt.compare(
        data.currentPassword,
        userExists.password,
      );
      if (oldPasswordValid) {
        const salt = 10;
        const newPasswordHashed = await bcrypt.hash(data.newPassword, salt);
        await this.prisma.user.update({
          where: { id: id },
          data: { password: newPasswordHashed },
        });
        return 'Senha alterada com sucesso!';
      } else {
        throw new BadRequestException('Senha antiga não confere.');
      }
    } else {
      throw new UnauthorizedException('Não foi possivel alterar a senha.');
    }
  }
}
