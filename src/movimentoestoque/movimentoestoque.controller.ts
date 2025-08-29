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
import { MovimentoEstoqueService } from './movimentoestoque.service';
import { Movimento_Estoque } from 'generated/prisma';
import { CreateMovimentoEstoqueDto } from './dto/create-movimentoestoque.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangeMovimentoEstoqueDto } from './dto/change-movimentoestoque.dto';

@Controller('movimento-estoque')
export class MovimentoEstoqueController {
  constructor(
    private readonly movimentoEstoqueService: MovimentoEstoqueService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(): Promise<Movimento_Estoque[] | null> {
    return this.movimentoEstoqueService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<Movimento_Estoque | null> {
    return this.movimentoEstoqueService.findById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  async createMovimentoEstoque(
    @Body() data: CreateMovimentoEstoqueDto,
  ): Promise<Movimento_Estoque> {
    return this.movimentoEstoqueService.createMovimentoEstoque(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(200)
  async changeMovimentoEstoque(
    @Body() data: ChangeMovimentoEstoqueDto,
  ): Promise<string | void> {
    return this.movimentoEstoqueService.changeMovimentoEstoque(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async deleteMovimentoEstoque(
    @Param('id') id: string,
  ): Promise<string | void> {
    return this.movimentoEstoqueService.deleteMovimentoEstoque(Number(id));
  }
}
