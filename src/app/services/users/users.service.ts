import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  login(data) {
    return this.http.post(`${this.url}/login`, data);
  }
}
