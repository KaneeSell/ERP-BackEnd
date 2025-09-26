import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Produtos } from '../../generated/prisma';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ChangeProdutoDto } from './dto/change-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async createProduto(data: CreateProdutoDto): Promise<Produtos> {
    console.log(
      `criando produto: { name: ${data.name}, data: ${new Date().toLocaleDateString()}, hora: ${new Date().toLocaleTimeString()} }`,
    );
    return await this.prisma.produtos.create({
      data: {
        name: data.name,
        value: data.value,
        valueVenda: data.valueVenda,
      },
    });
  }
  async resetProdutosQuantidade(): Promise<{ message: string; data: number }> {
    console.log(
      `resetando quantidade dos produtos: { data: ${new Date().toLocaleDateString()}, hora: ${new Date().toLocaleTimeString()} }`,
    );
    return {
      message: 'Atualizado Quantidade em produtos com Sucesso!',
      data: await this.prisma.$executeRawUnsafe(`
    UPDATE "Produtos" p
    SET quantidade = COALESCE((
        SELECT SUM(
            CASE 
                WHEN m.tipo = 'Entrada' THEN m.quantidade
                WHEN m.tipo = 'Saida' THEN -m.quantidade
                ELSE 0
            END
        )
        FROM "Movimento_Estoque" m
        WHERE m."produtoId" = p.id
    ), 0);
  `),
    };
  }

  async findById(id: number): Promise<Produtos | null> {
    console.log(`buscando produtos por id: { id: ${id} }`);
    const produto = await this.prisma.produtos.findUnique({
      where: { id: id },
    });
    if (!produto) throw new BadRequestException('Produto não encontrado!');
    return produto;
  }

  async findAll(): Promise<Produtos[] | null> {
    console.log('findAll...');
    console.log(`buscando todos produtos.`);
    return await this.prisma.produtos.findMany({
      where: { deletedAt: null },
    });
  }

  async changeProduto(data: ChangeProdutoDto): Promise<string | void> {
    console.log(`changeProduto: { id: ${data.id} }`);
    const produtoExists = await this.prisma.produtos.findUnique({
      where: { id: data.id },
    });
    if (produtoExists) {
      console.log(
        `Old {name: ${produtoExists.name}, value: ${produtoExists.value}, isAtive: ${produtoExists.isAtive}}`,
      );
      console.log(
        `New {name: ${data.name}, value: ${data.value}, isAtive: ${data.isAtive}}`,
      );
      try {
        const response = await this.prisma.produtos.update({
          where: { id: data.id },
          data: {
            name: data.name,
            value: data.value,
            isAtive: data.isAtive,
            valueVenda: data.valueVenda,
          },
        });
        console.log('Produto alterado com sucesso!');
        console.log(response);
      } catch (error) {
        console.log('Erro ao alterar produto:', error);
        throw new BadRequestException('Erro ao alterar produto.');
      }
      return 'Produto alterado com sucesso!';
    } else {
      console.log('Não existe esse produto.');
      throw new UnauthorizedException('Não existe esse produto.');
    }
  }

  async deleteProduto(id: number): Promise<string | void> {
    console.log(`deleteProduto: { id: ${id} }`);
    const produtoExists = await this.prisma.produtos.findUnique({
      where: { id: id },
    });
    if (produtoExists) {
      console.log(
        `Produto deletado: {name: ${produtoExists.name}, value: ${produtoExists.value}}`,
      );
      await this.prisma.produtos.update({
        where: { id: id },
        data: { deletedAt: new Date() },
      });
      console.log('Produto excluido com sucesso!');
      return 'Produto excluido com sucesso!';
    } else {
      console.log('Não existe esse produto.');
      throw new UnauthorizedException('Não existe esse produto.');
    }
  }
}
