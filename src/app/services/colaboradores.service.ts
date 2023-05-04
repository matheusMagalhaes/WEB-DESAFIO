import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments.ts/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  constructor(private http: HttpClient) {}

  buscarTodosColaboraores(): Observable<any> {
    return this.http.get(`${environment.urlBase}colaborador/buscar`);
  }

  salvarColaborador(object: any) {
    return this.http.post(`${environment.urlBase}colaborador/salvar`, object);
  }

  deletarColaborador(id: number) {
    return this.http.delete(`${environment.urlBase}colaborador/deletar/${id}`);
  }
}
