-- CreateEnum
CREATE TYPE "TipoEmpresa" AS ENUM ('Matriz', 'Filial');

-- AlterTable
ALTER TABLE "Entidade" ADD COLUMN     "nomeFantasia" TEXT,
ADD COLUMN     "primeiraCompra" TIMESTAMP(3),
ADD COLUMN     "primeiraVenda" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "descricao" TEXT;

-- AlterTable
ALTER TABLE "PedidoDeVenda" ADD COLUMN     "descricao" TEXT;

-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "grupoProdutoId" INTEGER,
ADD COLUMN     "subGrupoProdutoId" INTEGER;

-- CreateTable
CREATE TABLE "Empresas" (
    "id" SERIAL NOT NULL,
    "nameRazao" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "cep" TEXT,
    "endereco" TEXT,
    "pais" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "bairro" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "telefone" TEXT,
    "cnpj" TEXT,
    "ie" TEXT,
    "logo" TEXT,
    "tipoEmpresa" "TipoEmpresa",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoProduto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GrupoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubGrupoProduto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SubGrupoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParcelaPedidoVenda" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "pedidoDeVendaId" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ParcelaPedidoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoDeCompra" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "entidadeId" INTEGER,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valorFinal" DOUBLE PRECISION NOT NULL,
    "isPago" BOOLEAN NOT NULL DEFAULT false,
    "dataCompra" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PedidoDeCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParcelaPedidoCompra" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "pedidoDeCompraId" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ParcelaPedidoCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_PedidoDeCompra" (
    "id" SERIAL NOT NULL,
    "pedidoDeCompraId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Item_PedidoDeCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContasAReceber" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "pedidoDeVendaId" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valorFinal" DOUBLE PRECISION NOT NULL,
    "isPago" BOOLEAN NOT NULL DEFAULT false,
    "dataRecebimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContasAReceber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContasAPagar" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "pedidoDeCompraId" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valorFinal" DOUBLE PRECISION NOT NULL,
    "isPago" BOOLEAN NOT NULL DEFAULT false,
    "dataRecebimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContasAPagar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivroCaixa" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "contasAReceberID" INTEGER NOT NULL,
    "contasAPagarID" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "debito" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "credito" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LivroCaixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesas" (
    "id" SERIAL NOT NULL,
    "entidadeId" INTEGER,
    "descricao" TEXT,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valorFinal" DOUBLE PRECISION NOT NULL,
    "dataDespesa" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Despesas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_nameRazao_key" ON "Empresas"("nameRazao");

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_cnpj_key" ON "Empresas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_ie_key" ON "Empresas"("ie");

-- CreateIndex
CREATE UNIQUE INDEX "GrupoProduto_name_key" ON "GrupoProduto"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubGrupoProduto_name_key" ON "SubGrupoProduto"("name");

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_grupoProdutoId_fkey" FOREIGN KEY ("grupoProdutoId") REFERENCES "GrupoProduto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_subGrupoProdutoId_fkey" FOREIGN KEY ("subGrupoProdutoId") REFERENCES "SubGrupoProduto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcelaPedidoVenda" ADD CONSTRAINT "ParcelaPedidoVenda_pedidoDeVendaId_fkey" FOREIGN KEY ("pedidoDeVendaId") REFERENCES "PedidoDeVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoDeCompra" ADD CONSTRAINT "PedidoDeCompra_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcelaPedidoCompra" ADD CONSTRAINT "ParcelaPedidoCompra_pedidoDeCompraId_fkey" FOREIGN KEY ("pedidoDeCompraId") REFERENCES "PedidoDeCompra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_PedidoDeCompra" ADD CONSTRAINT "Item_PedidoDeCompra_pedidoDeCompraId_fkey" FOREIGN KEY ("pedidoDeCompraId") REFERENCES "PedidoDeCompra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_PedidoDeCompra" ADD CONSTRAINT "Item_PedidoDeCompra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContasAReceber" ADD CONSTRAINT "ContasAReceber_pedidoDeVendaId_fkey" FOREIGN KEY ("pedidoDeVendaId") REFERENCES "PedidoDeVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContasAPagar" ADD CONSTRAINT "ContasAPagar_pedidoDeCompraId_fkey" FOREIGN KEY ("pedidoDeCompraId") REFERENCES "PedidoDeCompra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivroCaixa" ADD CONSTRAINT "LivroCaixa_contasAReceberID_fkey" FOREIGN KEY ("contasAReceberID") REFERENCES "ContasAReceber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivroCaixa" ADD CONSTRAINT "LivroCaixa_contasAPagarID_fkey" FOREIGN KEY ("contasAPagarID") REFERENCES "ContasAPagar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesas" ADD CONSTRAINT "Despesas_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
