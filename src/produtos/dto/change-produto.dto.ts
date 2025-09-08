import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangeProdutoDto {
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  id: number;
  @IsNotEmpty({ message: 'O nome é Obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no minimo 4 caracteres.' })
  name: string;
  @IsNotEmpty({ message: 'O valor de compra é Obrigatório.' })
  value: number;
  @IsNotEmpty({ message: 'O valor de venda é Obrigatório.' })
  valueVenda: number;
  @IsNotEmpty({ message: 'O status é Obrigatório.' })
  isAtive: boolean;
}
