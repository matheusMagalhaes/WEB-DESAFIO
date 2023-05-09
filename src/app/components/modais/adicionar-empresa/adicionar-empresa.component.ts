import { Component } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-empresa',
  templateUrl: './adicionar-empresa.component.html',
  styleUrls: ['./adicionar-empresa.component.css'],
})
export class AdicionarEmpresaComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private toastrService: ToastrService,
    public dialog: MatDialogRef<AdicionarEmpresaComponent>,
    private formBuilder: FormBuilder
  ) {}

  empresaForm!: FormGroup;

  ngOnInit() {
    this.formValidation()
  }

  formValidation() {
    this.empresaForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: [null, Validators.required],
      telefone: [null, Validators.required],
    });
  }

  adicionarEmpresa() {
    this.empresaSerice.salvarEmrpesa(this.empresaForm.value).subscribe(() => {
      this.toastrService.success('Empresa criada!', '', {
        toastClass: 'toast-success',
      });
      this.dialog.close(true);
    });
  }
}
