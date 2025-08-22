/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Estoque` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estoque_name_key" ON "Estoque"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_name_key" ON "Produtos"("name");
