import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns a formatted phone number
 */
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, query: string): string {
    if (query && query != '') {
      let index = 0;
      let lowerValue = value.toLowerCase();
      let lowerQuery = query.toLowerCase();
      do {
        index = lowerValue.indexOf(lowerQuery, index);
        console.log(lowerValue, lowerQuery, index);
        if (index >= 0) {
          value = `${value.substring(0, index)}<b>${value.substring(index, index + query.length)}</b>${value.substring(index + query.length)}`;
          lowerValue = value.toLowerCase();
          index += query.length + 7;
        }
      } while (index >= 0 && index < lowerQuery.length);
    }
    return value;
  }
}
