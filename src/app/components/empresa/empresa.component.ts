import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarEmpresaComponent } from '../modais/adicionar-empresa/adicionar-empresa.component';

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
    const dialog = this.dialog.open(AdicionarEmpresaComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialog.afterClosed().subscribe(() => {
      this.buscarTodasEmpresa()
    });
  }
}
