import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AtulizarJogadorDto } from "./dtos/atualizar-jogador.dto";

@Injectable()
export class JogadoresService {
  // private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel("Jogador") private readonly jogadorModel: Model<Jogador>
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`O email ${email} ja esta cadastrado`);
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtulizarJogadorDto
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não foi encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate(
        {
          _id,
        },
        {
          $set: atualizarJogadorDto,
        }
      )
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultaJogadorPor(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Nenhum jogador encontrado com o email ${email}`
      );
    }
    return jogadorEncontrado;
  }

  async consultaJogadorPorid(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Nenhum jogador encontrado com o email ${_id}`
      );
    }
    return jogadorEncontrado;
  }

  async deletarJogadorPorEmail(_id: string): Promise<void> {

    const jogadorEncontrado = await this.consultaJogadorPorid(_id);

    if(jogadorEncontrado){
      return await this.jogadorModel.deleteOne({ _id }).exec();
    }

  }
}
