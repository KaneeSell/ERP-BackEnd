export class ChangeEntidadeDto {
  id: number;
  name?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  creditoGasto?: number;
  creditoLimite?: number;
  creditoIsAtive?: boolean;
  isFornecedor?: boolean;
  isCliente?: boolean;
  cnpj?: string;
  cpf?: string;
  isAtive?: boolean;
}
