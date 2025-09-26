-- CreateEnum
CREATE TYPE "TipoUnidade" AS ENUM ('Unidade', 'Pacote', 'Caixa', 'Frasco', 'Litro', 'Mililitro', 'Galão', 'Kg', 'Grama', 'Miligrama', 'Tonelada', 'Libra', 'Onca', 'Metro', 'Centimetro', 'Milimetro', 'Quilometro', 'Polegada', 'Pe', 'MetroQuadrado', 'CentimetroQuadrado', 'Hectare', 'Acre', 'MetroCubico', 'LitroCubico', 'MililitroCubico', 'Segundo', 'Minuto', 'Hora', 'Dia', 'UnidadeMedidaEspecial');

-- DropForeignKey
ALTER TABLE "PedidoDeVenda" DROP CONSTRAINT "PedidoDeVenda_entidadeId_fkey";

-- AlterTable
ALTER TABLE "Entidade" ADD COLUMN     "ultimaCompra" TIMESTAMP(3),
ADD COLUMN     "ultimaVenda" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PedidoDeVenda" ALTER COLUMN "entidadeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "quantidade" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tipoUnidade" "TipoUnidade" DEFAULT 'Unidade',
ADD COLUMN     "ultimaVenda" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "PedidoDeVenda" ADD CONSTRAINT "PedidoDeVenda_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
