import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarEmpresaComponent } from '../modais/adicionar-empresa/adicionar-empresa.component';
import { ModalConfirmacaoComponent } from '../modais/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent {
  constructor(
    private empresaSerice: EmpresaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarTodasEmpresa();
  }

  dataSource: any = new MatTableDataSource();
  filteredData: any[] = [];
  colunaEmpresa: any[] = [
    'acao',
    'id',
    'nome',
    'cnpj',
    'email',
    'telefone',
    'endereco',
  ];

  buscarTodasEmpresa() {
    this.empresaSerice.buscarEmpresas().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  criarEmpresa() {
    this.dialog
      .open(AdicionarEmpresaComponent, {
        width: 'auto',
        height: 'auto',
      })
      .afterClosed()
      .subscribe(() => {
        this.buscarTodasEmpresa();
      });
  }

  deletarEmpresa(element: any) {
    this.dialog
      .open(ModalConfirmacaoComponent, {
        width: 'auto',
        height: 'auto',
        data: element,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.buscarTodasEmpresa();
      });
  }

  editarEmpresa(data: any) {
    this.dialog.open(AdicionarEmpresaComponent, {
      data: data,
      width: 'auto',
      height: 'auto',
    });
  }
}
