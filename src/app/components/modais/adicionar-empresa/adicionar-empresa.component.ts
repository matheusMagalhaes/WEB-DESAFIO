import { Component } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';

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
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService
  ) {}

  empresaForm!: FormGroup;

  ngOnInit() {
    this.formValidation();
  }

  formValidation() {
    this.empresaForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento:[null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],

      }),
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

    buscarEnderecoPorCep() {
      let cep = this.empresaForm.get('endereco.cep')!.value;

      if (cep != null && cep !== '') {
        this.cepService
          ?.consultaCep(cep)
          ?.subscribe((data) => this.preencherForm(data));
      }
    }

  preencherForm(data: any) {
    debugger
    this.empresaForm.patchValue({
      endereco: {
        rua: data.logradouro,
        bairro: data.bairro,
        cidade:data.localidade,
        uf: data.uf,
      },
    });
  }
}
