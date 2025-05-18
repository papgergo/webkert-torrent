import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate',
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: any): Date | null {
    if (value && typeof value.toDate === 'function') {
      return value.toDate();
    }
    return null;
  }
}
