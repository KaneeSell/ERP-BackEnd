import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movimento_Estoque, Prisma } from '../../generated/prisma';
import { CreateMovimentoEstoqueDto } from './dto/create-movimentoestoque.dto';
import { ChangeMovimentoEstoqueDto } from './dto/change-movimentoestoque.dto';

@Injectable()
export class MovimentoEstoqueService {
  constructor(private prisma: PrismaService) {}

  async createMovimentoEstoque(
    data: CreateMovimentoEstoqueDto,
  ): Promise<Movimento_Estoque> {
    console.log(
      `criando movimento estoque: { produto_id: ${data.produto_id}, estoque_id: ${data.estoque_id}, quantidade: ${data.quantidade}, tipo: ${data.tipo} }`,
    );
    await this.prisma.produtos.update({
      where: { id: data.produto_id },
      data: {
        quantidade:
          data.tipo === 'Entrada'
            ? { increment: data.quantidade }
            : { decrement: data.quantidade },
      },
    });
    try {
      return await this.prisma.movimento_Estoque.create({
        data: {
          descricao: data.descricao ? data.descricao : null,
          produtoId: data.produto_id,
          estoqueId: data.estoque_id,
          quantidade: data.quantidade,
          tipo: data.tipo,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Id de produto ou Id de estoque inválido.',
          );
        }
      }
      throw error; // outros erros sobem "normais"
    }
  }

  async findById(id: number): Promise<Movimento_Estoque | null> {
    console.log(`buscando movimento estoque por id: { id: ${id} }`);
    const movimento = await this.prisma.movimento_Estoque.findUnique({
      where: { id: id },
    });
    if (!movimento) {
      throw new BadRequestException('Movimento Estoque Não encontrado!');
    }
    return movimento;
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
      try {
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
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2003') {
            throw new BadRequestException(
              'Id de produto ou Id de estoque inválido.',
            );
          }
        }
        throw error; // outros erros sobem "normais"
      }
    } else {
      console.log('Não existe esse movimento estoque.');
      throw new UnauthorizedException('Não existe esse movimento estoque.');
    }
  }

  async deleteMovimentoEstoque(id: number): Promise<string | void> {
    console.log(`deleteEstoque: { id: ${id} }`);
    const movimentoEstoqueExists =
      await this.prisma.movimento_Estoque.findUnique({
        where: { id: id },
      });
    if (movimentoEstoqueExists) {
      console.log(
        `Movimento Estoque deletado: {produto_id: ${movimentoEstoqueExists.produtoId}, estoque_id: ${movimentoEstoqueExists.estoqueId}, quantidade: ${movimentoEstoqueExists.quantidade}, tipo: ${movimentoEstoqueExists.tipo}}`,
      );
      await this.prisma.movimento_Estoque.update({
        where: { id: id },
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
