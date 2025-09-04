export class CreatePedidoDeVendaDto {
  entidadeId: number;
  valorTotal: number;
  desconto?: number;
  valorFinal: number;
  isPago?: boolean;
  dataVenda: Date;
  dataPagamento?: Date;
}
