import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'O nome é Obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no minimo 4 caracteres.' })
  name: string;
  @IsNotEmpty({ message: 'O valor é Obrigatório.' })
  value: number;
}
