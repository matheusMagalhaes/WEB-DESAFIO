import { Empresa } from './empresa.mode';

export class Colaborador {
  cpf!: string;
  nome!: string;
  telefone!: string;
  email!: string;
  endereco!: string;
  empresa!: Empresa;
}
