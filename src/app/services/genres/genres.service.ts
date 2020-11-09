import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getGenres() {
    return this.http.get(`${this.url}/genres`)
  };
}
