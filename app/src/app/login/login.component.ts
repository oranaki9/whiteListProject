import { ApiResponse } from './../../../../shared/interfaces/api-response';
import { UserLogin } from './../../../../shared/interfaces/users';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private auth: AuthService, private router: Router) { }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", Validators.required)
    });
  }
  get userName(): AbstractControl {
    return this.loginForm.get("userName");
  }
  get password(): AbstractControl {
    return this.loginForm.get("password");
  }
  onUserLogin(): void {
    const user: UserLogin = {
      userName: this.userName.value,
      password: this.password.value
    };
    this.auth.login(user).pipe(takeUntil(this.destroy$)).subscribe((result: ApiResponse) => {
      this.auth.saveTokenInLocalStorage(result.data);
      this.router.navigate(["/white-list"]);
    });
  }
}


