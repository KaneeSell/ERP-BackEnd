import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class ChangePedidoDeVendaDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  entidadeId?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  valorTotal: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  desconto: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  valorFinal: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  isPago: boolean;

  @IsDate()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  dataVenda: Date;

  @IsDate()
  @IsNotEmpty({ message: 'O id é Obrigatório.' })
  dataPagamento?: Date;
}
