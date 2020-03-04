import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhiteListManagerComponent } from './white-list-manager/white-list-manager/white-list-manager.component';
import { AuthenticationGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "white-list",
    loadChildren: () => import("./white-list-manager/white-list-manager/white-list.module").then(mod => mod.WhiteListModule)
    , canActivate: [AuthenticationGuard]
  },
  { path: "login", loadChildren: () => import("./login/login.module").then(mod => mod.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticationGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
