import { Component } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-empresa',
  templateUrl: './adicionar-empresa.component.html',
  styleUrls: ['./adicionar-empresa.component.css'],
})
export class AdicionarEmpresaComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private toastrService: ToastrService
  ) {}

  object = new Empresa();

  adicionarEmpresa() {
    debugger
    this.empresaSerice.salvarEmrpesa(this.object).subscribe(() => {
      this.toastrService.success('Empresa criada!', 'Sucesso', {
        timeOut: 3000,
      });
    });
  }
}
