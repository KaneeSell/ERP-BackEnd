import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { ChangeEntidadeDto } from './dto/change-entidade.dto';
import { UserGuard } from 'src/auth/user.guard';
import { UserReqType } from 'src/types/UserReqType';

@Controller('entidade')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @UseGuards(UserGuard)
  @Get()
  @HttpCode(200)
  async findAll(@Request() req: UserReqType): Promise<any> {
    console.log(`${req.user.email} - Buscando todas as Entidades`);
    return await this.entidadeService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  @HttpCode(200)
  async findById(
    @Param('id') id: string,
    @Request() req: UserReqType,
  ): Promise<any> {
    console.log(`${req.user.email} - Buscando Entidade por ID: {Id: ${id}}`);
    return await this.entidadeService.findById(Number(id));
  }

  @UseGuards(UserGuard)
  @Post()
  @HttpCode(200)
  async createEntidade(
    @Body() data: CreateEntidadeDto,
    @Request() req: UserReqType,
  ): Promise<any> {
    console.log(`${req.user.email} - Criando Entidade: {nome: ${data.name}}`);
    return await this.entidadeService.createEntidade(data);
  }

  @UseGuards(UserGuard)
  @Patch()
  @HttpCode(200)
  async changeEntidade(
    @Body() data: ChangeEntidadeDto,
    @Request() req: UserReqType,
  ): Promise<string | void> {
    console.log(
      `${req.user.email} - Editando Entidade: {Id: ${data.id}, nome: ${data.name}}`,
    );
    return await this.entidadeService.changeEntidade(data);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteEntidade(
    @Param('id') id: string,
    @Request() req: UserReqType,
  ): Promise<string | void> {
    console.log(`${req.user.email} - Deletando Entidade: {Id: ${id}}`);
    return await this.entidadeService.deleteEntidade(Number(id));
  }
}
