-- AlterTable
ALTER TABLE "User" ADD COLUMN     "entidadeId" INTEGER;

-- CreateTable
CREATE TABLE "Entidade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "cep" TEXT,
    "creditoGasto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creditoLimite" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creditoIsAtive" BOOLEAN NOT NULL DEFAULT false,
    "isFornecedor" BOOLEAN NOT NULL DEFAULT false,
    "isCliente" BOOLEAN NOT NULL DEFAULT false,
    "cnpj" TEXT,
    "cpf" TEXT,
    "isAtive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Entidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoDeVenda" (
    "id" SERIAL NOT NULL,
    "entidadeId" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valorFinal" DOUBLE PRECISION NOT NULL,
    "isPago" BOOLEAN NOT NULL DEFAULT false,
    "dataVenda" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PedidoDeVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_PedidoDeVenda" (
    "id" SERIAL NOT NULL,
    "pedidoDeVendaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Item_PedidoDeVenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entidade_cnpj_key" ON "Entidade"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Entidade_cpf_key" ON "Entidade"("cpf");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoDeVenda" ADD CONSTRAINT "PedidoDeVenda_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "Entidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_PedidoDeVenda" ADD CONSTRAINT "Item_PedidoDeVenda_pedidoDeVendaId_fkey" FOREIGN KEY ("pedidoDeVendaId") REFERENCES "PedidoDeVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_PedidoDeVenda" ADD CONSTRAINT "Item_PedidoDeVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
