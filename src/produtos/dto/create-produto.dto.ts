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
  tipoUnidade: TipoUnidade;
  @IsOptional()
  quantidade: number;
  @IsOptional()
  descricao: string;
  @IsOptional()
  @IsDate({ message: 'A data da última venda é inválida.' })
  ultimaVenda?: Date;
}
