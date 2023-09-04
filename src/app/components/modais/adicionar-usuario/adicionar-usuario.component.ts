import { Component, EventEmitter, Output } from '@angular/core';
import { Colaborador } from 'src/app/models/colaborador.model';
import { Empresa } from 'src/app/models/empresa.model';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsgService } from 'src/app/services/msg.service';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css'],
})
export class AdicionarUsuarioComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private colaboradorSercvice: ColaboradoresService,
    private msgService: MsgService,
    public dialog: MatDialogRef<AdicionarUsuarioComponent>,
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService
  ) {}

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  formColaborador!: FormGroup;
  cargos: any[] = [];
  empresas: Empresa[] = [];

  ngOnInit() {
    this.buscarTodasEmpresa();
    this.formValidation();
  }

  formValidation() {
    this.formColaborador = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      empresa: [null, Validators.required],
      cargo: [null, Validators.required],
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

  buscarTodasEmpresa() {
    this.empresaSerice.buscarEmpresas().subscribe(
      (res) => {
        this.empresas = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarEnderecoPorCep() {
    let cep = this.formColaborador.get('endereco.cep')!.value;
    if (cep != null && cep !== '') {
      this.cepService?.consultaCep(cep)?.subscribe((data: any) => {
        this.preencherForm(data);
      });
    }
  }

  preencherForm(data: any) {
    this.formColaborador.patchValue({
      endereco: {
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      },
    });
  }

  salvarColaborador() {
    debugger
    this.colaboradorSercvice
      .salvarColaborador(this.formColaborador.value)
      .subscribe({
        next: () => {
          this.msgService.msgSucesso('Usuario criado com sucesso!');
          this.dialog.close(true);
        },
        error: (res) => {
          this.msgService.msgError(res.error.message);
          this.dialog.close(true);
        },
      });
  }

  modalClose() {
    this.dialog.close();
  }
}
