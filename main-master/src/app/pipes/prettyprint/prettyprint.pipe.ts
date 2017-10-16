import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prettyprint' })

export class PrettyPrintPipe implements PipeTransform {
  transform(value: string) {
    return JSON.stringify(value, null, 2)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>');
  }
}

