import { IsNotEmpty } from 'class-validator';

export class DeleteMovimentoEstoqueDto {
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  id: number;
}
