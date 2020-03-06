import { SearchFilterPipe } from './../../pipes/search-filter.pipe';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatListModule
} from "@angular/material";
import { WhiteListManagerComponent } from './white-list-manager.component';
const routes: Routes = [{ path: "", component: WhiteListManagerComponent }];
@NgModule({
  declarations: [WhiteListManagerComponent, SearchFilterPipe],
  imports: [CommonModule, RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
})
export class WhiteListModule { }

