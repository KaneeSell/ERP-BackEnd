import {
  BadRequestException,
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
import { PedidoDeVendaService } from './pedidodevenda.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePedidoDeVendaDto } from './dto/create-pedidodevenda.dto';
import { ChangePedidoDeVendaDto } from './dto/change-pedidodevenda.dto';

@Controller('pedido-de-venda')
export class PedidoDeVendaController {
  constructor(private readonly pedidoDeVendaService: PedidoDeVendaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll() {
    const pedidos = await this.pedidoDeVendaService.findAll();
    return pedidos;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const pedido = await this.pedidoDeVendaService.findById(Number(id));
    if (!pedido) {
      throw new BadRequestException('Pedido de Venda Não encontrado!');
    }
    return pedido;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  async createPedidoDeVenda(@Body() data: CreatePedidoDeVendaDto) {
    const pedido = await this.pedidoDeVendaService.createPedidoDeVenda(data);
    if (!pedido) {
      return { message: 'Erro ao criar pedido de venda!' };
    }
    return pedido;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(200)
  async changePedidoDeVenda(@Body() data: ChangePedidoDeVendaDto) {
    const result = await this.pedidoDeVendaService.changePedidoDeVenda(data);
    return { message: result };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async deletePedidoDeVenda(@Param('id') id: string) {
    const result = await this.pedidoDeVendaService.deletePedidoDeVenda(
      Number(id),
    );
    return { message: result };
  }
}
