import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  isLoggedIn = false;
  constructor(private _cookieService: CookieService) { }

  ngOnInit() {
    this.checkIfLoggedIn()
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    this._cookieService.remove("token")
  }
  checkIfLoggedIn() {
    const token = this._cookieService.get("token")
    if (token) {
      this.isLoggedIn = true
    }
  }
}
