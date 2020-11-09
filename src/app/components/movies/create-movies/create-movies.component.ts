import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MoviesService } from '../../../services/movies/movies.service';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.css']
})
export class CreateMoviesComponent implements OnInit {
  createMoviesForm:FormGroup;  
  constructor(private _moviesService: MoviesService, private _builder: FormBuilder) { }
  
  ngOnInit(): void {
    this.createMoviesForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'director': new FormControl(null),
      'genre': this._builder.array([]),
      '99popularity': new FormControl(null),
      'imdb_score': new FormControl(null),
    })
    const genreArray = (this.createMoviesForm.get('genre') as FormArray);
    this.addNewGenre();
  }
  onSubmit(){
    console.log(this.createMoviesForm.value)
    let body = this.createMoviesForm.value
    const genreList = []
    this.createMoviesForm.value['genre'].map(genre=>{
      genreList.push(genre.name)
    })
    body.genre = genreList
    this._moviesService.addMovie(body).subscribe(value =>{
      console.log(value)
    })
  }
  getControls() {
    return (this.createMoviesForm.get('genre') as FormArray).controls;
  }
  addNewGenre(){
    const genreArray = (this.createMoviesForm.get('genre')as FormArray);
    genreArray.push(this._builder.group({
      name: ['']
    }));
  }
  deleteGenre(i:number){
    const genreArray = (this.createMoviesForm.get('genre')as FormArray);
    genreArray.removeAt(i);
    if(genreArray.length===0){
      this.addNewGenre();
    }
  }
}
