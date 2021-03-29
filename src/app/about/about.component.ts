import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  array1 = [
    { value: 1, name: 'CampoUno' },
    { value: 2, name: 'CampoDos' },
    { value: 3, name: 'CampoTres' },
    { value: 4, name: 'CampoCuatro' },
    { value: 5, name: 'CampoCinco' },
    { value: 6, name: 'CampoSeis' },
  ];

  array2 = [
    { value: 21, name: 'a' },
    { value: 20, name: 'b' },
    { value: 19, name: 'c' },
    { value: 18, name: 'd' },
    { value: 17, name: 'e' },
    { value: 16, name: 'f' },
  ];

  constructor() {}

  ngOnInit() {}

  arrayToObject(array: any[]) {
    const resultado = {};

    array.forEach((item) => {
      resultado[item.name] = item.value;
    });

    console.log('Array to Object');
    console.log('resultado: ', JSON.stringify(resultado));
  }

  objectToArray() {
    const obj = {
      CampoUno: 1,
      CampoDos: 2,
      CampoTres: 3,
      CampoCuatro: 4,
      CampoCinco: 5,
      CampoSeis: 6,
    };

    const resultado: any[] = [];

    const objKeys = Object.keys(obj);

    objKeys.forEach((key) => {
      resultado.push({ value: obj[key], name: key });
    });

    console.log('Object to Array');
    console.log('resultado: ', JSON.stringify(resultado));
  }
}
