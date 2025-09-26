import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Entidade } from '../../generated/prisma';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { ChangeEntidadeDto } from './dto/change-entidade.dto';

@Injectable()
export class EntidadeService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Entidade[] | null> {
    return await this.prisma.entidade.findMany({ where: { deletedAt: null } });
  }

  async findById(id: number): Promise<Entidade | null> {
    const entidade = await this.prisma.entidade.findUnique({ where: { id } });
    if (!entidade) throw new BadRequestException('Entidade não encontrada!');
    return entidade;
  }

  async createEntidade(data: CreateEntidadeDto): Promise<Entidade> {
    const entidade = {
      name: data.name,
      email: data.email ?? undefined,
      telefone: data.telefone ?? undefined,
      endereco: data.endereco ?? undefined,
      cidade: data.cidade ?? undefined,
      estado: data.estado ?? undefined,
      cep: data.cep ?? undefined,
      creditoGasto: data.creditoGasto ?? undefined,
      creditoLimite: data.creditoLimite ?? undefined,
      creditoIsAtive: data.creditoIsAtive ?? undefined,
      isFornecedor: data.isFornecedor ?? undefined,
      isCliente: data.isCliente ?? undefined,
      cnpj: data.cnpj ?? undefined,
      cpf: data.cpf ?? undefined,
      isAtive: data.isAtive ?? undefined,
    };
    return await this.prisma.entidade.create({ data: entidade });
  }

  async changeEntidade(data: ChangeEntidadeDto): Promise<string | void> {
    const entidadeExists = await this.prisma.entidade.findUnique({
      where: { id: data.id },
    });
    if (entidadeExists) {
      await this.prisma.entidade.update({
        where: { id: data.id },
        data,
      });
      return 'Entidade alterada com sucesso!';
    } else {
      throw new UnauthorizedException('Não existe essa entidade.');
    }
  }

  async deleteEntidade(id: number): Promise<string | void> {
    const entidadeExists = await this.prisma.entidade.findUnique({
      where: { id },
    });
    if (entidadeExists) {
      await this.prisma.entidade.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return 'Entidade excluída com sucesso!';
    } else {
      throw new UnauthorizedException('Não existe essa entidade.');
    }
  }
}
