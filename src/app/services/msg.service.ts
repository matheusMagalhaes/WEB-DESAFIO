import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  msgSucesso(msg: string) {
    this.toastrService.success(msg, '', {
      toastClass: 'toast-success',
    });
  }

  msgError(msg: any) {
    this.toastrService.error(msg, '', {
      toastClass: 'toast-error',
    });
  }
}
