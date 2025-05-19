import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateFileSize',
})
export class AbbreviateFileSizePipe implements PipeTransform {
  transform(value: any): string | null {
    if (value) {
      const fileSizeLength = value.toString().length;
      if (fileSizeLength < 4) {
        return value + ' B';
      } else if (fileSizeLength < 7) {
        return (value / 1024).toFixed(2) + ' KB';
      } else if (fileSizeLength < 10) {
        return (value / 1024 / 1024).toFixed(2) + ' MB';
      } else if (fileSizeLength < 13) {
        return (value / 1024 / 1024 / 1024).toFixed(2) + ' GB';
      }
      return value;
    }
    return null;
  }
}
