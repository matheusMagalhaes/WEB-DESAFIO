import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css'],
})
export class ModalConfirmacaoComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private colaboradorService: ColaboradoresService,
    public dialog: MatDialogRef<ModalConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) {}

  cancelar() {
    this.dialog.close();
  }

  deletar() {
    this.colaboradorService.deletarColaborador(this.data.id).subscribe(() => {
      this.toastrService.success('Exclusão efetuada com sucesso!', '', {
        toastClass: 'toast-success',
      });
    });
    this.dialog.close(true);
  }
}
