import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'tokenIdParse'
})

export class TokenIdParsePipe implements PipeTransform {
  transform(value: string): string {
    return ('0000' + value).slice(-4);
  }
}
