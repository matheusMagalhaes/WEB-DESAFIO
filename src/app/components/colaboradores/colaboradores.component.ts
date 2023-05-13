import { Component, ViewChild, Inject } from '@angular/core';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarUsuarioComponent } from '../modais/adicionar-usuario/adicionar-usuario.component';
import { ModalConfirmacaoComponent } from '../modais/modal-confirmacao/modal-confirmacao.component';
@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'],
})
export class ColaboradoresComponent {
  constructor(
    private colaboradorSerivice: ColaboradoresService,
    private empresaSerice: EmpresaService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.buscarTodosColabores();
    this.buscarTodasEmpresa();
  }

  dataSource: any = new MatTableDataSource();
  empresas: Empresa[] = [];
  filteredData: any = new MatTableDataSource();
  colunasTabela: any[] = [
    'acao',
    'codigoColaborador',
    'nome',
    'cpf',
    'email',
    'telefone',
    'endereco',
    'empresa',
    'cargo',
  ];

  buscarTodosColabores() {
    this.colaboradorSerivice.buscarTodosColaboraores().subscribe((res) => {
      this.dataSource.data = res;
      this.filteredData = new MatTableDataSource(res);
    });
  }

  buscarTodasEmpresa() {
    this.empresaSerice.buscarEmpresas().subscribe((res) => {
      this.empresas = res;
    });
  }
  filtrarTabela(event: any) {
    this.filteredData = this.dataSource.data.filter(
      (x: any) => x.empresa.id == event.id
    );
  }

  adiconarColaborador() {
    this.dialog
      .open(AdicionarUsuarioComponent, {
        width: 'auto',
        height: 'auto',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.buscarTodosColabores();
      });
  }

  deletarUser(element: any) {
    this.dialog
      .open(ModalConfirmacaoComponent, {
        width: 'auto',
        height: 'auto',
        data: element,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.buscarTodosColabores();
      });
  }


}
