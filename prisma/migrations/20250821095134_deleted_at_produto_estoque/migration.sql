-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Movimento_Estoque" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "deletedAt" TIMESTAMP(3);
