import { Component, EventEmitter, Output } from '@angular/core';
import { Colaborador } from 'src/app/models/colaborador.model';
import { Empresa } from 'src/app/models/empresa.model';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css'],
})
export class AdicionarUsuarioComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private colaboradorSercvice: ColaboradoresService,
    private toastrService: ToastrService,
    public dialog: MatDialogRef<AdicionarUsuarioComponent>
  ) {}

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  object = new Colaborador();
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
    this.colaboradorSercvice.salvarColaborador(this.object).subscribe(() => {
      this.toastrService.success('Criado com sucesso!', '', {
        toastClass: 'toast-success',
      });

    });
    this.dialog.close(true)
  }
}
