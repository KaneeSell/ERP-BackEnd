import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateEntidadeDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @IsNumber()
  @IsOptional()
  creditoGasto?: number;

  @IsNumber()
  @IsOptional()
  creditoLimite?: number;

  @IsBoolean()
  @IsOptional()
  creditoIsAtive?: boolean;

  @IsBoolean()
  @IsOptional()
  isFornecedor?: boolean;

  @IsBoolean()
  @IsOptional()
  isCliente?: boolean;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsBoolean()
  @IsOptional()
  isAtive?: boolean;
}
