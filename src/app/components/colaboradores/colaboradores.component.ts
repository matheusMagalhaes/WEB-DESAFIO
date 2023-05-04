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
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscarTodosColabores();
    this.buscarTodasEmpresa();
  }

  dataSource: any;
  empresas: Empresa[] = [];
  filteredData: any = new MatTableDataSource();
  colaboradorSelected!: any[];
  colunasTabela: any[] = [
    'acao',
    'codigoColaborador',
    'nome',
    'cpf',
    'email',
    'telefone',
    'endereco',
    'empresa',
  ];

  buscarTodosColabores() {
    this.colaboradorSerivice.buscarTodosColaboraores().subscribe((res) => {
      this.dataSource = res;
    });
  }

  buscarTodasEmpresa() {
    debugger;
    this.empresaSerice.buscarEmpresas().subscribe((res) => {
      this.empresas = res;
    });
  }
  filtrarTabela(event: any) {
    this.filteredData = this.dataSource.filter(
      (x: any) => x.empresa.id == event.id
    );
  }

  adiconarColaborador() {
    const dialog = this.dialog.open(AdicionarUsuarioComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialog.afterClosed().subscribe(() => {
      this.buscarTodosColabores();
    });
  }

  deletarUser(element: any) {
    debugger
    const dialog = this.dialog.open(ModalConfirmacaoComponent, {
      width: 'auto',
      height: 'auto',
      data: element,
    });
      dialog.afterClosed().subscribe((res) => {
        if(res){
          this.buscarTodosColabores();
        }
      });
  }
}
