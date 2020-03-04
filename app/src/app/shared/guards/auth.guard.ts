
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuth()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

}
