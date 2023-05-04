import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments.ts/enviroment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  buscarEmpresas(): Observable<any> {
    return this.http.get(`${environment.urlBase}empresa/buscar`);
  }

  salvarEmrpesa(object: any): Observable<any> {
    return this.http.post(`${environment.urlBase}empresa/salvar`, object);
  }


  deletarEmpresa(id: number) {
    return this.http.delete(`${environment.urlBase}empresa/deletar/${id}`);
  }}
