import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies/movies.service';

@Component({
  selector: 'app-update-movies',
  templateUrl: './update-movies.component.html',
  styleUrls: ['./update-movies.component.css']
})
export class UpdateMoviesComponent implements OnInit {
  updateMoviesForm: FormGroup;
  id: String;
  name: String;
  error = []
  errorMessage = ""
  genres: Array<String> = [];
  constructor(private _moviesService: MoviesService, private _builder: FormBuilder, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => this.id = params.id);
    this.updateMoviesForm = new FormGroup({
      'director': new FormControl(null),
      'genre': this._builder.array([]),
      '99popularity': new FormControl(null),
      'imdb_score': new FormControl(null),
    })
    const genreArray = (this.updateMoviesForm.get('genre') as FormArray);
    this._moviesService.getMovieById(this.id).subscribe(resp => {
      this.name = resp['name'];
      this.updateMoviesForm.controls['director'].setValue(resp['director']);
      this.updateMoviesForm.controls['imdb_score'].setValue(resp['imdb_score']);
      this.updateMoviesForm.controls['99popularity'].setValue(resp['99popularity']);
      this.genres = resp['genre']
      this.genres.map(genre => {
        this.addNewGenre(genre)
      })
      if (this.genres.length === 0) {
        this.addNewGenre();
      }
    });
  }
  getControls() {
    return (this.updateMoviesForm.get('genre') as FormArray).controls;
  }
  addNewGenre(defaultGenre: String = '') {
    const genreArray = (this.updateMoviesForm.get('genre') as FormArray);
    genreArray.push(this._builder.group({
      name: [defaultGenre]
    }));
  }
  deleteGenre(i: number) {
    const genreArray = (this.updateMoviesForm.get('genre') as FormArray);
    genreArray.removeAt(i);
    if (genreArray.length === 0) {
      this.addNewGenre();
    }
  }
  onSubmit() {
    this.error = [];
    this.errorMessage = ""
    let body = this.updateMoviesForm.value
    const genreList = []
    if (this.updateMoviesForm.value['genre']) {
      this.updateMoviesForm.value['genre'].map(genre => {
        if (genre.name)
          genreList.push(genre.name)
      })
    }
    body.genre = genreList.length === 0 ? null : genreList
    body.id = this.id
    this._moviesService.updateMovie(this.updateMoviesForm.value).subscribe(resp => {
      console.log(resp)
    }, (err) => {  
      this.error = err.error.errors || []; 
      if (typeof err.error==="string"){
        this.errorMessage = err.error
      }
       
    })
  }
}

