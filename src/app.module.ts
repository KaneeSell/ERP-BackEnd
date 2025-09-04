import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './produtos/produtos.module';
import { EstoqueModule } from './estoque/estoque.module';
import { MovimentoEstoqueModule } from './movimentoestoque/movimentoestoque.module';
import { PedidoDeVendaModule } from './pedidodevenda/pedidodevenda.module';
import { EntidadeModule } from './entidade/entidade.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProdutoModule,
    EstoqueModule,
    MovimentoEstoqueModule,
    AuthModule,
    PedidoDeVendaModule,
    EntidadeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
