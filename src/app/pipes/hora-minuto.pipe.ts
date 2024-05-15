import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaMinuto'
})
export class HoraMinutoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let fechaActual = new Date();
    let fecha = new Date(Date.parse(value));

    if (fechaActual.getDay() == fecha.getDay()) {//si el dia es el mismo
      if (fecha.getMinutes() < 10) {
        return fecha.getHours() + ":0" + fecha.getMinutes();
      }
      else {

        return fecha.getHours() + ":" + fecha.getMinutes();
      }
    }
    else {
      return fecha.getDay() + "/" + fecha.getMonth() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    }
  }

}
