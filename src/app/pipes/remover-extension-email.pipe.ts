import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removerExtensionEmail'
})
export class RemoverExtensionEmailPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    return value.split("@")[0];
  }

}
