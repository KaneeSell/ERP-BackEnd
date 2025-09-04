export class ChangePedidoDeVendaDto {
  id: number;
  entidadeId?: number;
  valorTotal?: number;
  desconto?: number;
  valorFinal?: number;
  isPago?: boolean;
  dataVenda?: Date;
  dataPagamento?: Date;
}
