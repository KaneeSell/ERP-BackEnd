import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateEntidadeDto {
  @IsNotEmpty({ message: 'O Nome é Obrigatório.' })
  @IsString({ message: 'O nome é obrigatório e deve ser um texto válido.' })
  name: string;
  @IsEmail({}, { message: 'E-mail inválido. Informe um e-mail válido.' })
  @IsOptional()
  email?: string;
  @IsString({ message: 'Telefone deve ser um texto válido.' })
  @IsOptional()
  telefone?: string;
  @IsString({ message: 'Endereço deve ser um texto válido.' })
  @IsOptional()
  endereco?: string;
  @IsString({ message: 'Cidade deve ser um texto válido.' })
  @IsOptional()
  cidade?: string;
  @IsString({ message: 'Estado deve ser um texto válido.' })
  @IsOptional()
  estado?: string;
  @IsString({ message: 'CEP deve ser um texto válido.' })
  @IsOptional()
  cep?: string;
  @IsNumber({}, { message: 'O crédito gasto deve ser um número.' })
  @IsOptional()
  creditoGasto?: number;
  @IsNumber({}, { message: 'O limite de crédito deve ser um número.' })
  @IsOptional()
  creditoLimite?: number;
  @IsBoolean({ message: 'O campo crédito ativo deve ser verdadeiro ou falso.' })
  @IsOptional()
  creditoIsAtive?: boolean;
  @IsBoolean({ message: 'O campo fornecedor deve ser verdadeiro ou falso.' })
  @IsOptional()
  isFornecedor?: boolean;
  @IsBoolean({ message: 'O campo cliente deve ser verdadeiro ou falso.' })
  @IsOptional()
  isCliente?: boolean;
  @IsString({ message: 'O CNPJ deve ser um texto válido.' })
  @IsOptional()
  cnpj?: string;
  @IsString({ message: 'O CPF deve ser um texto válido.' })
  @IsOptional()
  cpf?: string;
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
  @IsOptional()
  isAtive?: boolean;
  @IsDate({ message: 'A última compra deve ser uma data válida.' })
  @IsOptional()
  ultimaCompra?: Date;
  @IsDate({ message: 'A última venda deve ser uma data válida.' })
  @IsOptional()
  ultimaVenda?: Date;
}
