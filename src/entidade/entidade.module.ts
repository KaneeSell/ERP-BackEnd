import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EntidadeController } from './entidade.controller';
import { EntidadeService } from './entidade.service';

@Module({
  imports: [PrismaModule],
  controllers: [EntidadeController],
  providers: [EntidadeService],
})
export class EntidadeModule {}
