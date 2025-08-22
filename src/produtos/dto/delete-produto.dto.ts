import { IsNotEmpty } from 'class-validator';

export class DeleteProdutoDto {
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  id: number;
}
