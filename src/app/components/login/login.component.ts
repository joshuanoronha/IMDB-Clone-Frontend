import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;  
  errorMessage = ""
  constructor(private _usersService: UsersService,private _cookieService: CookieService,private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'password': new FormControl('', Validators.minLength(8)),
      'email': new FormControl('', Validators.email)
    })

  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.errorMessage = ""
    this._usersService.login(this.loginForm.value).subscribe(resp => {
      this._cookieService.put('token',resp['token']);
      this._router.navigate(["/movies"])
    }, error => {
      this.errorMessage = "You are not Authorized to Login"
    });
  }
}
