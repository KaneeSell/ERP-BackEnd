import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateEstoqueDto {
  @IsNotEmpty({ message: 'O nome é Obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no minimo 4 caracteres.' })
  name: string;
}
