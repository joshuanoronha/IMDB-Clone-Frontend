import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getMovies() {
    return this.http.get(`${this.url}/movies`);
  }
  updateMovie(body) {
    return this.http.patch(`${this.url}/movie`,body);
  }
  addMovie(body) {
    return this.http.post(`${this.url}/movie`,body);
  }
}
