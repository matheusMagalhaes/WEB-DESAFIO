import { Component, EventEmitter, Output } from '@angular/core';
import { Colaborador } from 'src/app/models/colaborador.model';
import { Empresa } from 'src/app/models/empresa.model';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public dialog: MatDialogRef<AdicionarUsuarioComponent>,
    private formBuilder: FormBuilder
  ) {}

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  formulario!: FormGroup;
  empresas: Empresa[] = [];
  ngOnInit() {
    this.buscarTodasEmpresa();
    this.formValidation()
  }


  formValidation(){
    this.formulario = this.formBuilder.group({
      nome:[null, Validators.required],
      cpf:[null, Validators.required],
      email:[null, [Validators.required, Validators.email]],
      telefone:[null, Validators.required],
      endereco:[null, Validators.required],
      empresa:[null, Validators.required]
    })
  }

  buscarTodasEmpresa() {
    this.empresaSerice.buscarEmpresas().subscribe((res) => {
      this.empresas = res;
    });
  }

  salvarColaborador() {
    this.colaboradorSercvice.salvarColaborador(this.formulario.value).subscribe(() => {
      this.toastrService.success('Criado com sucesso!', '', {
        toastClass: 'toast-success',
      });
      this.dialog.close(true);
    });
  }
}
