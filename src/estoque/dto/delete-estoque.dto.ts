import { IsNotEmpty } from 'class-validator';

export class DeleteEstoqueDto {
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  id: number;
}
