import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Tipo } from 'generated/prisma';

export class CreateMovimentoEstoqueDto {
  @IsNotEmpty({ message: 'O id do produto é Obrigatório.' })
  produto_id: number;
  @IsNotEmpty({ message: 'O id do estoque é Obrigatório.' })
  estoque_id: number;
  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsEnum(Tipo, { message: 'O tipo deve ser Entrada ou Saida' })
  tipo: Tipo;
  @IsNotEmpty({ message: 'A quantidade é Obrigatória.' })
  quantidade: number;
  @IsOptional()
  @IsString({ message: 'A Descrição deve ser um string' })
  descricao?: string;
}
