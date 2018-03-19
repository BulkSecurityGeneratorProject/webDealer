import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shipped'
})
export class ShippedPipe implements PipeTransform {

  transform(value: boolean, args?: any): string {
    return value ? 'received' : 'shipping';
  }

}
