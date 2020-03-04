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
  sendFile() {
    if (!this.filePreview) {
      return;
    }
    this.whiteList.addFile(this.filePreview).pipe(takeUntil(this.destroy$)).subscribe((data: ApiResponse) => {
      this.files.push(data.data);
    });
  }
}
