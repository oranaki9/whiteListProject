import { IFile } from './../../../../server/models/file';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(files: IFile[], searchText: string): any {
    if (!files.length) return [];
    if (!searchText) return files;
    const searchTerm = searchText.toLowerCase();
    return files.filter((file: IFile) => {
      return file.fileName.toLowerCase().includes(searchTerm) || file.path.toLowerCase().includes(searchTerm);
    });
  }

}
