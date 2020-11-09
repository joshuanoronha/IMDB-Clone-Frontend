import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'http://murmuring-shore-39160.herokuapp.com'
  constructor(private http: HttpClient) { }
  getMovies(searchParams = {}) {
    console.log(searchParams)
    let genreParam = ''
    console.log(searchParams['genre'])
    if (searchParams['genre']) {
      const genres = searchParams['genre']
      genres.map(genre => {
        genreParam += `genre[${genre.trim()}]=true&`
        console.log(genreParam)
      })
      delete searchParams['genre']
    }
    console.log(genreParam)
    return this.http.get(`${this.url}/movies?${genreParam}`, { params: searchParams })
  };
  getMovieById(id) {
    return this.http.get(`${this.url}/movie/${id}`);
  }
  updateMovie(body) {
    return this.http.patch(`${this.url}/movie`, body);
  }
  addMovie(body) {
    return this.http.post(`${this.url}/movie`, body);
  }
  deleteMovie(id) {
    return this.http.delete(`${this.url}/movie/${id}`);
  }
}
