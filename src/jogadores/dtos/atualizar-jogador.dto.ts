import { IsNotEmpty } from 'class-validator';

export class AtulizarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;
  @IsNotEmpty()
  readonly nome: string;
}