import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css'],
})
export class EnderecoFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {
    this.formValidation();
  }

  enderecoForm!: FormGroup;
  @Output() endereco = new EventEmitter<any>();

  formValidation() {
    this.enderecoForm = this.formBuilder.group({
      cep: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      uf: [null, Validators.required],
    });
  }


  buscarEnderecoPorCep() {
    let cep = this.enderecoForm.get('cep')!.value;
    if (cep != null && cep !== '') {
      this.cepService
        ?.consultaCep(cep)
        ?.subscribe((data) => this.preencherForm(data));
    }
    this.endereco.emit(this.enderecoForm.value);
  }

  preencherForm(data: any) {
    this.enderecoForm.patchValue({
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
    });
  }
}
