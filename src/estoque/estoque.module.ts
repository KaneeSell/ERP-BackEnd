import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [PrismaModule],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
