import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {

  transform(matchStr: string, replaceKey: string, replaceValue: any): string {
    return matchStr.replace(replaceKey, replaceValue);
  }

}
