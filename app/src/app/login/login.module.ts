import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule
} from "@angular/material";
const routes: Routes = [{ path: "", component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class LoginModule { }

