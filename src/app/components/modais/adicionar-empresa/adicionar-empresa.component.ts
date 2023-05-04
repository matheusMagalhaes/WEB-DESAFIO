import { Component } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-empresa',
  templateUrl: './adicionar-empresa.component.html',
  styleUrls: ['./adicionar-empresa.component.css'],
})
export class AdicionarEmpresaComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private toastrService: ToastrService,
    public dialog: MatDialogRef<AdicionarEmpresaComponent>
  ) {}

  object = new Empresa();

  adicionarEmpresa() {
    this.empresaSerice.salvarEmrpesa(this.object).subscribe(() => {
      this.toastrService.success('Empresa criada!', '', {
        toastClass: 'toast-success',
      });
      this.dialog.close(true);
    });
  }
}
