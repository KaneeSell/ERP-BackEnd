import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDeVendaDto } from './dto/create-pedidodevenda.dto';
import { ChangePedidoDeVendaDto } from './dto/change-pedidodevenda.dto';

@Injectable()
export class PedidoDeVendaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.pedidoDeVenda.findMany({
      where: { deletedAt: null },
    });
  }

  async findById(id: number) {
    const pedido = await this.prisma.pedidoDeVenda.findUnique({
      where: { id },
    });
    if (!pedido)
      throw new BadRequestException('Pedido de venda não encontrado!');
    return pedido;
  }

  async createPedidoDeVenda(data: CreatePedidoDeVendaDto) {
    return await this.prisma.pedidoDeVenda.create({ data });
  }

  async changePedidoDeVenda(data: ChangePedidoDeVendaDto) {
    const pedidoExists = await this.prisma.pedidoDeVenda.findUnique({
      where: { id: data.id },
    });
    if (pedidoExists) {
      await this.prisma.pedidoDeVenda.update({
        where: { id: data.id },
        data,
      });
      return 'Pedido de venda alterado com sucesso!';
    } else {
      throw new UnauthorizedException('Não existe esse pedido de venda.');
    }
  }

  async deletePedidoDeVenda(id: number) {
    const pedidoExists = await this.prisma.pedidoDeVenda.findUnique({
      where: { id },
    });
    if (pedidoExists) {
      await this.prisma.pedidoDeVenda.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return 'Pedido de venda excluído com sucesso!';
    } else {
      throw new UnauthorizedException('Não existe esse pedido de venda.');
    }
  }
}
