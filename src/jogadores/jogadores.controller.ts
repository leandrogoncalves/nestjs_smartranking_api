import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { AtulizarJogadorDto } from "./dtos/atualizar-jogador.dto";
import { JogadoresService } from "./jogadores.service";
import { Jogador } from "./interfaces/jogador.interface";
import { JogadoresValidacaoParametrosPipe } from "./pipes/jogadores-validacao-parametros.pipe";

@Controller("api/v1/jogadores")
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtulizarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string  
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPorId(
    @Param("_id", JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<Jogador> {
      return this.jogadoresService.consultaJogadorPorid(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param("_id", JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    this.jogadoresService.deletarJogadorPorEmail(_id);
  }
}
