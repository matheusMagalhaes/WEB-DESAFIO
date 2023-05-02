import { Component } from '@angular/core';
import { Colaborador } from 'src/app/models/colaborador.model';
import { Empresa } from 'src/app/models/empresa.mode';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css'],
})
export class AdicionarUsuarioComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private colaboradorSercvice: ColaboradoresService,
    private toastrService: ToastrService
  ) {}

  object  = new Colaborador();
  ngOnInit() {
    this.buscarTodasEmpresa();
  }

  empresas: Empresa[] = [];
  buscarTodasEmpresa() {
    this.empresaSerice.buscarEmpresas().subscribe((res) => {
      this.empresas = res;
    });
  }

  salvarColaborador() {
    debugger;
    this.colaboradorSercvice
      .salvarColaborador(this.object)
      .subscribe(() => this.toastrService.success('Usuário criado!'));
  }
}
