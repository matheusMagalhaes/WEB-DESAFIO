import { Component, EventEmitter } from '@angular/core';
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
  endereco: any;

  ngOnInit() {
    this.formValidation();
  }

  enderecoSet(endereco: any) {
    this.endereco = endereco;
    this.empresaForm.get('endereco')?.patchValue(this.endereco);
  }

  formValidation() {
    this.empresaForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      endereco: this.endereco,
      // endereco: this.formBuilder.group({
      //   cep: [null, Validators.required],
      //   numero: [null, Validators.required],
      //   complemento:[null],
      //   rua: [null, Validators.required],
      //   bairro: [null, Validators.required],
      //   cidade: [null, Validators.required],
      //   uf: [null, Validators.required],

      // }),
    });
  }

  adicionarEmpresa() {
    debugger;
    this.empresaSerice.salvarEmrpesa(this.empresaForm.value).subscribe(() => {
      console.log(this.empresaForm);
      this.toastrService.success('Empresa criada!', '', {
        toastClass: 'toast-success',
      });
      this.dialog.close(true);
    });
  }
}
