import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PedidoDeVendaController } from './pedidodevenda.controller';
import { PedidoDeVendaService } from './pedidodevenda.service';

@Module({
  imports: [PrismaModule],
  controllers: [PedidoDeVendaController],
  providers: [PedidoDeVendaService],
})
export class PedidoDeVendaModule {}
