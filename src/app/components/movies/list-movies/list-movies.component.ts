import { Component, OnInit } from '@angular/core';
import '../../../services/movies/movies.service'
import { MoviesService } from '../../../services/movies/movies.service';
@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  display:String = 'HI'
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies()
  }
  getMovies(){
    this.moviesService.getMovies()
    .subscribe(resp => {
      // display its headers
      this.display = JSON.stringify(resp)
    });
  }
}
