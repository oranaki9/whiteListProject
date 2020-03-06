import { takeUntil } from 'rxjs/operators';
import { IFile } from './../../../../../server/models/file';
import { ApiResponse } from './../../../../../shared/interfaces/api-response';
import { AuthService } from './../../services/auth.service';
import { WhiteListService } from './../../services/white-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-white-list-manager',
  templateUrl: './white-list-manager.component.html',
  styleUrls: ['./white-list-manager.component.less']
})
export class WhiteListManagerComponent implements OnInit, OnDestroy {
  public files: IFile[];
  public filePreview;
  public userRole = "";
  public searchTerm = "";
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public selectedFile: { fileName: string, filePath: string, fileData: any, type: string };

  constructor(private whiteList: WhiteListService, private auth: AuthService, ) { }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.auth.getUserRole().pipe(takeUntil(this.destroy$)).subscribe((userRole: ApiResponse) => {
      this.userRole = userRole.data;
    });
    this.whiteList.getFiles().pipe(takeUntil(this.destroy$)).subscribe((result: ApiResponse) => {

      this.files = result.data;
    });
  }

  onFilePicked(event: Event) {
    const fileInp: HTMLInputElement = (event.target as HTMLInputElement);
    if (fileInp.files.length > 0) {
      const file: File = fileInp.files[0];
      this.filePreview = file;
    }
  }
  onFileClicked(file: IFile) {

    this.selectedFile = {
      fileName: file.fileName,
      filePath: file.path,
      fileData: null,
      type: file.type
    };
    if (!file.type.includes("image")) {
      this.whiteList.queryToFile(file.fileName).pipe(takeUntil(this.destroy$)).subscribe(fileData => {
        this.selectedFile = {
          ...this.selectedFile,
          fileData: fileData.data,
        };
      });
    }
  }
  sendFile() {
    if (!this.filePreview) {
      return;
    }
    this.whiteList.addFile(this.filePreview).pipe(takeUntil(this.destroy$)).subscribe((result: ApiResponse) => {
      console.log(result.data);

      this.files.push(result.data);
    });
  }
}
