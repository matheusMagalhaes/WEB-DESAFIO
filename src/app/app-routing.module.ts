import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';

const routes : Routes =[
  {path:'empresa', component: EmpresaComponent},
  {path:'colaborador', component:ColaboradoresComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
