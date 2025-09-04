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
    return await this.prisma.entidade.create({ data });
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
