import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://murmuring-shore-39160.herokuapp.com'
  constructor(private http: HttpClient) { }
  login(data) {
    return this.http.post(`${this.url}/login`, data);
  }
}
