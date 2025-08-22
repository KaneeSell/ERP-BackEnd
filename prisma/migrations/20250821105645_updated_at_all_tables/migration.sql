/*
  Warnings:

  - Added the required column `updatedAt` to the `Estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Movimento_Estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Movimento_Estoque" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
