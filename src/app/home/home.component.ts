import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paises: any | undefined;
  formulario: FormGroup;
  isLoading = false;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  actualDateMin = new Date();
  actualDateMax = new Date();
  minDate = new Date(this.actualDateMin.setMonth(this.actualDateMin.getMonth() - 11));
  maxDate = new Date(this.actualDateMax.setDate(this.actualDateMax.getDate() + 1));

  constructor(private homeService: HomeService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.isLoading = true;
    this.homeService
      .getPaises()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((paises: any) => {
        this.paises = Object.values(paises.data);
      });
  }

  submitForm() {
    console.log(this.formulario.value);
  }

  private createForm() {
    this.formulario = this.formBuilder.group({
      fechaReserva: ['', Validators.required],
      correo: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      nombre: ['', Validators.required],
      pais: [''],
    });
  }
}
