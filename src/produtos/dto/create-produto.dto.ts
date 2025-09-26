import { IsDate, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { TipoUnidade } from 'generated/prisma';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'O nome é Obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no minimo 4 caracteres.' })
  name: string;
  @IsNotEmpty({ message: 'O valor é Obrigatório.' })
  value: number;
  @IsNotEmpty({ message: 'O valor de venda é Obrigatório.' })
  valueVenda: number;
  @IsOptional()
  @IsNotEmpty({ message: 'O tipo de unidade é Obrigatório.' })
  tipoUnidade: TipoUnidade;
  @IsOptional()
  @IsNotEmpty({ message: 'A quantidade é Obrigatória.' })
  quantidade: number;
  @IsOptional()
  @IsNotEmpty({ message: 'A descrição é Obrigatória.' })
  descricao: string;
  @IsOptional()
  @IsDate({ message: 'A data da última venda é inválida.' })
  ultimaVenda?: Date;
}
