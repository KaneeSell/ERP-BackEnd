/*
  Warnings:

  - You are about to drop the column `data_hora` on the `Movimento_Estoque` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Movimento_Estoque" DROP COLUMN "data_hora",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
