import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenresService } from 'src/app/services/genres/genres.service';

import '../../../services/movies/movies.service'
import { MoviesService } from '../../../services/movies/movies.service';
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
  constructor(private _movieService: MoviesService, private _genreService: GenresService) { }

  ngOnInit(): void {
    this.getMovies()
    this.getGenres()
    this.searchForm = new FormGroup({
      'search': new FormControl(''),
      'order_by': new FormControl('desc'),
      'sort_by':new FormControl('name'),
      'genre':new FormControl(null)
    })
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
    
    const searchParams = {
      search: this.searchForm.value.search,
      sort_by: this.searchForm.value.sort_by,
      order_by: this.searchForm.value.order_by,
      genre: this.selectedGenres,
    }
    this.getMovies(searchParams)
  }
}
