import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MsgService } from 'src/app/services/msg.service';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css'],
})
export class ModalConfirmacaoComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private colaboradorService: ColaboradoresService,
    private empresaService: EmpresaService,
    public dialog: MatDialogRef<ModalConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: MsgService
  ) {}

  cancelar() {
    this.dialog.close();
  }

  deletar() {
    if (typeof this.data === 'object' && this.data.hasOwnProperty('cpf')) {
      this.colaboradorService.deletarColaborador(this.data.id).subscribe(() => {
        this.msgService.msgSucesso('Usuário Excluido com sucesso!');
        this.dialog.close(true);
      });
    } else {
      this.empresaService.deletarEmpresa(this.data.id).subscribe(() => {
        this.msgService.msgSucesso('Empresa Excluida com sucesso!');
        this.dialog.close(true);
      });
    }
  }
}
