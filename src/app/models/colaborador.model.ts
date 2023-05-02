import { Empresa } from './empresa.model';

export class Colaborador {
  cpf!: string;
  nome!: string;
  telefone!: string;
  email!: string;
  endereco!: string;
  empresa!: Empresa;
}
