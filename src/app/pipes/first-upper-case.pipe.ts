import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpperCase'
})
export class FirstUpperCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let arrayPalabra = value.split("");
    let retorno = "";
    let contador = 0;
    arrayPalabra.forEach(letra => {
      if (contador == 0) {
        retorno += letra.toUpperCase();
        contador++;
      }
      else {
        retorno += letra;
      }
    });
    return retorno;
  }

}
