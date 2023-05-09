import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { AppMsgTabelaVaziaComponent } from './components/app-msg-tabela-vazia/app-msg-tabela-vazia.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdicionarUsuarioComponent } from './components/modais/adicionar-usuario/adicionar-usuario.component';
import { NgxMaskModule,  } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { AdicionarEmpresaComponent } from './components/modais/adicionar-empresa/adicionar-empresa.component';
import { ModalConfirmacaoComponent } from './components/modais/modal-confirmacao/modal-confirmacao.component';

@NgModule({
  declarations: [
    AppComponent,
    ColaboradoresComponent,
    AppMsgTabelaVaziaComponent,
    AdicionarUsuarioComponent,
    EmpresaComponent,
    AdicionarEmpresaComponent,
    ModalConfirmacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
