import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;  
  constructor(private usersService: UsersService,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'password': new FormControl('', Validators.minLength(8)),
      'email': new FormControl('', Validators.email)
    })

  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.usersService.login(this.loginForm.value).subscribe(resp => {
      console.log(resp)
      return this.cookieService.put('token',resp['token']);
    });
  }
}
