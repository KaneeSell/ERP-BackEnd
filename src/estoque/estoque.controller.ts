import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { Estoque } from 'generated/prisma';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangeEstoqueDto } from './dto/change-estoque.dto';
import { DeleteEstoqueDto } from './dto/delete-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(): Promise<Estoque[] | null> {
    return this.estoqueService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  async createProduto(@Body() data: CreateEstoqueDto): Promise<Estoque> {
    return this.estoqueService.createProduto(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(200)
  async changePassword(@Body() data: ChangeEstoqueDto): Promise<string | void> {
    return this.estoqueService.changeEstoque(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  @HttpCode(200)
  async deleteProduto(@Body() data: DeleteEstoqueDto): Promise<string | void> {
    return this.estoqueService.deleteEstoque(data);
  }
}
