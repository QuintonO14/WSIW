import { Component, OnInit } from '@angular/core';
import { TvGenres, MovieGenres } from 'src/app/utils/lists';
import { Router } from '@angular/router';
import * as _ from 'lodash'
import { faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'


interface Genre {
  name: string,
  id: number   
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.less']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = []
  genre: number;
  clicked:boolean;
  selection: string;
  selectedGenres: number[] = []
  faLeft = faAngleDoubleLeft
  faRight = faAngleDoubleRight

  constructor(private router: Router) {}

  ngOnInit(): void {
    let existingGenres:any = localStorage.getItem("genres")
    //Determines genres and whether they are meant for TV or Movies so the API call
    if(existingGenres) {
    this.genres = JSON.parse(existingGenres)
    } else {
    let option = localStorage.getItem("option")
    if(option) {
      this.selection = option
    } else {
      this.router.navigateByUrl('/')
    }
    this.genres = this.selection == 'movies' ? MovieGenres : TvGenres
    localStorage.setItem("genres", JSON.stringify(this.genres))
    }
  }

  //Add genre to selectedGenres array if it does not exist, otherwise remove it.
  addGenre(genre: number) {
    let items = document.getElementsByClassName("genres")
    let item = document.getElementById(`${genre}`)
    if(this.selectedGenres.includes(genre)) {
      item?.classList.remove('toggled')
      this.selectedGenres = _.without(this.selectedGenres, genre)
      for(let i = 0; i < items.length; i++) {
          if(items[i].hasAttribute('disabled')) {
            items[i].classList.toggle("toggled")
            items[i].removeAttribute("disabled")
          }
      }
    } else {
      item?.classList.add('toggled')
      this.selectedGenres.push(genre)
      if(this.selectedGenres.length === 5) {
      for (let i = 0; i < items.length; i++) {
        if(!items[i].classList.contains("toggled")) {
        items[i].classList.toggle('toggled')
        items[i].setAttribute('disabled', 'disabled')
        }
      }
     }
    }
    //Add and remove disabled attribute based on selectedGenres having genres
    if(this.selectedGenres.length < 1) {
      document.getElementById("next")?.setAttribute("disabled", "disabled")
    } else {
      document.getElementById("next")?.removeAttribute("disabled")
    }
    localStorage.setItem("selections", JSON.stringify((this.selectedGenres)))
    return this.selectedGenres
  }

  changeComponent(component: string) {
    this.router.navigate(['/'+component]);
  }

}
