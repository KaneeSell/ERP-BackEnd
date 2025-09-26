-- CreateTable
CREATE TABLE "TagProduto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "produtosId" INTEGER,

    CONSTRAINT "TagProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProdutosTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProdutosTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagProduto_name_key" ON "TagProduto"("name");

-- CreateIndex
CREATE INDEX "_ProdutosTags_B_index" ON "_ProdutosTags"("B");

-- AddForeignKey
ALTER TABLE "_ProdutosTags" ADD CONSTRAINT "_ProdutosTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutosTags" ADD CONSTRAINT "_ProdutosTags_B_fkey" FOREIGN KEY ("B") REFERENCES "TagProduto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
