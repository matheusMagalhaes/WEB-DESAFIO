import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments.ts/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  constructor(private http: HttpClient) {}

  buscarCargos(): Observable<any>{
    return this.http.get(`${environment.urlBase}cargo/buscar`)
  }
}
