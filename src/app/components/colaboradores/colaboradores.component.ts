import { Component, ViewChild, Inject } from '@angular/core';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.mode';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdicionarUsuarioComponent } from '../modais/adicionar-usuario/adicionar-usuario.component';
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

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit() {
    this.buscarTodosColabores();
    this.buscarTodasEmpresa();
  }

  dataSource = new MatTableDataSource();
  filteredData: any[] = [];
  empresas: Empresa[] = [];
  lista: any[] = [];
  colunasTabela: any[] = [
    'codigoColaborador',
    'nome',
    'cpf',
    'email',
    'telefone',
    'endereco',
    'empresa',
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  buscarTodosColabores() {
    this.colaboradorSerivice.buscarTodosColaboraores().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  buscarTodasEmpresa() {
    this.empresaSerice.buscarEmpresas().subscribe((res) => {
      this.empresas = res;
    });
  }

  filtrarTabela(event: any) {
    this.filteredData = this.dataSource.data.filter(
      (x: any) => x.empresa && x.empresa.id == event.id
    );
  }

  adiconarColaborador() {
    const dialog = this.dialog.open(AdicionarUsuarioComponent, {
      width: 'auto',
      height: 'auto',
    });
  }
}
