import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MovimentoEstoqueController } from './movimentoestoque.controller';
import { MovimentoEstoqueService } from './movimentoestoque.service';

@Module({
  imports: [PrismaModule],
  controllers: [MovimentoEstoqueController],
  providers: [MovimentoEstoqueService],
})
export class MovimentoEstoqueModule {}
