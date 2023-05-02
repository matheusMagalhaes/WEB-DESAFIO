import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-desafio';

  colaborador!: Boolean
  empresa!: Boolean
  isColaborador() {
    this.colaborador = true
    this.empresa = false
  }
  isEmpresa(){
    this.colaborador = false
    this.empresa =  true
  }
}

