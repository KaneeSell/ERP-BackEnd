import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { ChangeEntidadeDto } from './dto/change-entidade.dto';

@Controller('entidade')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(): Promise<any> {
    return await this.entidadeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<any> {
    return await this.entidadeService.findById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  async createEntidade(@Body() data: CreateEntidadeDto): Promise<any> {
    return await this.entidadeService.createEntidade(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(200)
  async changeEntidade(
    @Body() data: ChangeEntidadeDto,
  ): Promise<string | void> {
    return await this.entidadeService.changeEntidade(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async deleteEntidade(@Param('id') id: string): Promise<string | void> {
    return await this.entidadeService.deleteEntidade(Number(id));
  }
}
