import { Component, EventEmitter, Inject } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { MsgService } from 'src/app/services/msg.service';

@Component({
  selector: 'app-adicionar-empresa',
  templateUrl: './adicionar-empresa.component.html',
  styleUrls: ['./adicionar-empresa.component.css'],
})
export class AdicionarEmpresaComponent {
  constructor(
    private empresaService: EmpresaService,
    private msgService: MsgService,
    public dialog: MatDialogRef<AdicionarEmpresaComponent>,
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  empresaForm!: FormGroup;
  endereco: any;
  isEditar?: Boolean;

  ngOnInit() {
    this.formValidation();
    if (this.data != null) {
      this.editar(this.data);
    }
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
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],
      }),
    });
  }

  buscarEnderecoPorCep() {
    let cep = this.empresaForm.get('endereco.cep')!.value;
    if (cep != null && cep !== '') {
      this.cepService?.consultaCep(cep)?.subscribe((data: any) => {
        this.preencherForm(data);
      });
    }
  }

  preencherForm(data: any) {
    this.empresaForm.patchValue({
      endereco: {
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      },
    });
  }

  adicionarEmpresa() {
    if (!this.isEditar) {
      this.empresaService
        .salvarEmrpesa(this.empresaForm.value)
        .subscribe(() => {
          this.msgService.msgSucesso('Empresa criada com sucesso!');
          this.dialog.close(true);
        });
    } else {
      const updatedData = { ...this.data, ...this.empresaForm.value };
      this.empresaService.editarEmpresa(updatedData).subscribe(() => {
        this.msgService.msgSucesso('Empresa editada com sucesso');
        this.dialog.close(true);
      });
    }
  }

  modalClose() {
    this.dialog.close();
  }

  editar(data: any) {
    this.isEditar = true;
    this.empresaForm.patchValue({
      id: data.id,
      nome: data.nome,
      cnpj: data.cnpj,
      email: data.email,
      telefone: data.telefone,
      endereco: {
        cep: data.endereco.cep,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento,
        rua: data.endereco.rua,
        bairro: data.endereco.bairro,
        cidade: data.endereco.cidade,
        uf: data.endereco.uf,
      },
    });
  }
}
