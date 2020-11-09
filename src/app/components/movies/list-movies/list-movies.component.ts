import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenresService } from 'src/app/services/genres/genres.service';

import '../../../services/movies/movies.service'
import { MoviesService } from '../../../services/movies/movies.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movies; 
  genres:Array<String>;
  selectedGenres = [];
  searchForm:FormGroup;
  columns = ['name','99popularity','imdb_score','director']
  dropdownSettings = {
    singleSelection: false,
    idField: 'index',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  constructor(private _movieService: MoviesService, private _genreService: GenresService, private _cookieService:CookieService) { }
  isLoggedIn = false
  ngOnInit(): void {
    this.getMovies()
    this.getGenres()
    this.searchForm = new FormGroup({
      'search': new FormControl(''),
      'order_by': new FormControl('Ascending'),
      'sort_by':new FormControl('name'),
      'genre':new FormControl(null)
    })
    this.checkIfLoggedIn()
  }
  getMovies(searchParams={}){
    this._movieService.getMovies(searchParams)
    .subscribe(movies => {
      console.log(movies)
      this.movies = movies
    });
  }
  getGenres(){
    this._genreService.getGenres()
    .subscribe((genres:Array<String>) => {
      console.log(genres)
      this.genres = genres
    });
  }
  onSubmit(){
    console.log(this.searchForm.value)
    const order_by = this.searchForm.value.order_by==='Ascending'? 'asc':'desc'
    const searchParams = {
      search: this.searchForm.value.search,
      sort_by: this.searchForm.value.sort_by,
      order_by: order_by,
      genre: this.selectedGenres,
    }
    this.getMovies(searchParams)
    this.checkIfLoggedIn()
  }
  checkIfLoggedIn() {
    const token = this._cookieService.get("token")
    console.log(token)
    if (token) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }
}
