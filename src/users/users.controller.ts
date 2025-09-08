import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { Role, User } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUserDto } from './dto/change-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[] | null> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  @HttpCode(200)
  async findById(@Req() req: { user: { userID: number } }): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    lastLogin: Date | null;
    isActive: boolean;
    role: Role;
  } | null> {
    const userId = req.user.userID;
    return this.userService.findById(userId);
  }

  @Post()
  @HttpCode(200)
  async createUser(@Body() data: CreateUserDto): Promise<string> {
    return this.userService.createUser(data);
  }

  @Patch()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async changeUser(
    @Req() req: { user: { userID: number } },
    @Body() data: ChangeUserDto,
  ): Promise<string> {
    if (req.user.userID) {
      const userId = req.user.userID;
      return this.userService.changeUser(userId, data);
    } else {
      throw new UnauthorizedException('ID no Token inválido.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  async changePassword(
    @Req() req: { user: { userID: number } },
    @Body() data: ChangePasswordDto,
  ): Promise<string | void> {
    if (req.user.userID) {
      const userId = req.user.userID;
      return this.userService.changePassword(userId, data);
    } else {
      throw new UnauthorizedException('ID no Token inválido.');
    }
  }
}
