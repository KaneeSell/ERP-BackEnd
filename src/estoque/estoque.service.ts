import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Estoque } from '../../generated/prisma';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { ChangeEstoqueDto } from './dto/change-estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Estoque | null> {
    console.log(`buscando estoque por id: { id: ${id} }`);
    const estoque = await this.prisma.estoque.findUnique({ where: { id: id } });
    if (!estoque) {
      throw new BadRequestException('Estoque Não encontrado!');
    }
    return estoque;
  }

  async createProduto(data: CreateEstoqueDto): Promise<Estoque> {
    console.log(
      `criando estoque: { name: ${data.name}, data: ${new Date().toLocaleDateString()}, hora: ${new Date().toLocaleTimeString()} }`,
    );
    const produtoExists = await this.prisma.estoque.findUnique({
      where: { name: data.name },
    });
    if (produtoExists) {
      console.log('estoque já existe.');
      throw new BadRequestException('Este nome de estoque já está cadastrado.');
    }
    return await this.prisma.estoque.create({
      data: {
        name: data.name,
      },
    });
  }

  async findByName(name: string): Promise<Estoque | null> {
    console.log(`buscando estoques por nome: { name: ${name} }`);
    return await this.prisma.estoque.findUnique({ where: { name: name } });
  }

  async findAll(): Promise<Estoque[] | null> {
    console.log('findAll...');
    console.log(`buscando todos estoques.`);
    return await this.prisma.estoque.findMany({
      where: { deletedAt: null },
    });
  }

  async changeEstoque(data: ChangeEstoqueDto): Promise<string | void> {
    console.log(`changeEstoque: { id: ${data.id} }`);
    const produtoExists = await this.prisma.estoque.findUnique({
      where: { id: data.id },
    });
    if (produtoExists) {
      console.log(`Old {name: ${produtoExists.name}}`);
      console.log(`New {name: ${data.name}}`);
      await this.prisma.estoque.update({
        where: { id: data.id },
        data: { name: data.name },
      });
      console.log('Estoque alterado com sucesso!');
      return 'Estoque alterado com sucesso!';
    } else {
      console.log('Não existe esse estoque.');
      throw new UnauthorizedException('Não existe esse estoque.');
    }
  }

  async deleteEstoque(id: number): Promise<string | void> {
    console.log(`deleteEstoque: { id: ${id} }`);
    const produtoExists = await this.prisma.estoque.findUnique({
      where: { id: id },
    });
    if (produtoExists) {
      console.log(`Estoque deletado: {name: ${produtoExists.name}}`);
      await this.prisma.estoque.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      console.log('Estoque excluido com sucesso!');
      return 'Estoque excluido com sucesso!';
    } else {
      console.log('Não existe esse estoque.');
      throw new UnauthorizedException('Não existe esse estoque.');
    }
  }
}
