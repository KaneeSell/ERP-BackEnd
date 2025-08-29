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
import { ProdutosService } from './produtos.service';
import { Produtos } from 'generated/prisma';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangeProdutoDto } from './dto/change-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtoService: ProdutosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(): Promise<Produtos[] | null> {
    return this.produtoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<Produtos | null> {
    return this.produtoService.findById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  async createProduto(@Body() data: CreateProdutoDto): Promise<Produtos> {
    return this.produtoService.createProduto(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(200)
  async changeProduto(@Body() data: ChangeProdutoDto): Promise<string | void> {
    return this.produtoService.changeProduto(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async deleteProduto(@Param('id') id: string): Promise<string | void> {
    return this.produtoService.deleteProduto(Number(id));
  }
}
