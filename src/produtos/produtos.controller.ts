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
import { ProdutosService } from './produtos.service';
import { Produtos } from 'generated/prisma';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangeProdutoDto } from './dto/change-produto.dto';
import { UserReqType } from 'src/types/UserReqType';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtoService: ProdutosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(@Request() req: UserReqType): Promise<Produtos[] | null> {
    const user = req.user;
    console.log(`[${user.email}] - Buscando todos os produtos.`);
    return this.produtoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  async findById(
    @Param('id') id: string,
    @Request() req: UserReqType,
  ): Promise<Produtos | null> {
    const user = req.user;
    console.log(`[${user.email}] - Buscando produto por ID [ ${id} ].`);
    return this.produtoService.findById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  async createProduto(
    @Body() data: CreateProdutoDto,
    @Request() req: UserReqType,
  ): Promise<Produtos> {
    const user = req.user;
    console.log(`[${user.email}] - Criando produto [ ${data.name} ].`);
    return this.produtoService.createProduto(data);
  }
  @UseGuards(AdminGuard)
  @Post('reset-quantidade')
  @HttpCode(200)
  async resetProdutosQuantidade(
    @Request() req: UserReqType,
  ): Promise<{ message: string; data: number }> {
    const user = req.user;
    console.log(`[${user.email}] - Resetando quantidade dos produtos...`);
    return this.produtoService.resetProdutosQuantidade();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(200)
  async changeProduto(
    @Body() data: ChangeProdutoDto,
    @Request() req: UserReqType,
  ): Promise<string | void> {
    const user = req.user;
    console.log(`[${user.email}] - Alterando produto [ ${data.name} ].`);
    return this.produtoService.changeProduto(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async deleteProduto(
    @Param('id') id: string,
    @Request() req: UserReqType,
  ): Promise<string | void> {
    const user = req.user;
    console.log(`[${user.email}] - Deletando produto [ ${id} ].`);
    return this.produtoService.deleteProduto(Number(id));
  }
}
