import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movimento_Estoque } from '../../generated/prisma';
import { CreateMovimentoEstoqueDto } from './dto/create-movimentoestoque.dto';
import { ChangeMovimentoEstoqueDto } from './dto/change-movimentoestoque.dto';
import { DeleteMovimentoEstoqueDto } from './dto/delete-movimentoestoque.dto';

@Injectable()
export class MovimentoEstoqueService {
  constructor(private prisma: PrismaService) {}

  async createMovimentoEstoque(
    data: CreateMovimentoEstoqueDto,
  ): Promise<Movimento_Estoque> {
    console.log(
      `criando estoque: { produto_id: ${data.produto_id}, estoque_id: ${data.estoque_id}, quantidade: ${data.quantidade}, tipo: ${data.tipo} }`,
    );
    return await this.prisma.movimento_Estoque.create({
      data: {
        descricao: data.descricao ? data.descricao : null,
        produtoId: data.produto_id,
        estoqueId: data.estoque_id,
        quantidade: data.quantidade,
        tipo: data.tipo,
      },
    });
  }

  async findByProdutoId(
    produto_id: number,
  ): Promise<Movimento_Estoque[] | null> {
    console.log(
      `buscando movimentos de estoque por descricao: { produto_id: ${produto_id} }`,
    );
    return await this.prisma.movimento_Estoque.findMany({
      where: { produtoId: produto_id },
    });
  }

  async findAll(): Promise<Movimento_Estoque[] | null> {
    console.log('findAll...');
    console.log(`buscando todos os movimentos de estoque.`);
    return await this.prisma.movimento_Estoque.findMany({
      where: { deletedAt: null },
    });
  }

  async changeMovimentoEstoque(
    data: ChangeMovimentoEstoqueDto,
  ): Promise<string | void> {
    console.log(`changeMovimentoEstoque: { id: ${data.id} }`);
    const movimentoEstoqueExists =
      await this.prisma.movimento_Estoque.findUnique({
        where: { id: data.id },
      });
    if (movimentoEstoqueExists) {
      console.log(
        `Old {produto_id: ${movimentoEstoqueExists.produtoId}, estoque_id: ${movimentoEstoqueExists.estoqueId}, quantidade: ${movimentoEstoqueExists.quantidade}, tipo: ${movimentoEstoqueExists.tipo}}`,
      );
      console.log(
        `New {produto_id: ${data.produto_id}, estoque_id: ${data.estoque_id}, quantidade: ${data.quantidade}, tipo: ${data.tipo}}`,
      );
      await this.prisma.movimento_Estoque.update({
        where: { id: data.id },
        data: {
          descricao: data.descricao ? data.descricao : null,
          produtoId: data.produto_id,
          estoqueId: data.estoque_id,
          quantidade: data.quantidade,
          tipo: data.tipo,
        },
      });
      console.log('Movimento Estoque alterado com sucesso!');
      return 'Movimento Estoque alterado com sucesso!';
    } else {
      console.log('Não existe esse movimento estoque.');
      throw new UnauthorizedException('Não existe esse movimento estoque.');
    }
  }

  async deleteMovimentoEstoque(
    data: DeleteMovimentoEstoqueDto,
  ): Promise<string | void> {
    console.log(`deleteEstoque: { id: ${data.id} }`);
    const movimentoEstoqueExists =
      await this.prisma.movimento_Estoque.findUnique({
        where: { id: data.id },
      });
    if (movimentoEstoqueExists) {
      console.log(
        `Estoque deletado: {produto_id: ${movimentoEstoqueExists.produtoId}, estoque_id: ${movimentoEstoqueExists.estoqueId}, quantidade: ${movimentoEstoqueExists.quantidade}, tipo: ${movimentoEstoqueExists.tipo}}`,
      );
      await this.prisma.movimento_Estoque.update({
        where: { id: data.id },
        data: { deletedAt: new Date() },
      });
      console.log('Movimento Estoque excluido com sucesso!');
      return 'Movimento Estoque excluido com sucesso!';
    } else {
      console.log('Não existe esse movimento estoque.');
      throw new UnauthorizedException('Não existe esse moviumento estoque.');
    }
  }
}
