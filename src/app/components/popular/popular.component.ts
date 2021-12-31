import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'


interface Title {
  adult?: boolean
  backdrop_path: string
  first_air_date?: string
  genre_ids: []
  id: number
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  name: string
  popularity: number
  poster_path: string
  release_date: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
}

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.less']
})
export class PopularComponent implements OnInit {
  selection = localStorage.getItem("option")
  receivedGenres: string[] = []
  genres: any
  results: Title[] = []
  selectedOption = localStorage.getItem("option")
  imageUrl: string
  checked: boolean = false
  titles: Title[] = []
  loading: boolean = true
  faLeft = faAngleDoubleLeft
  faRight = faAngleDoubleRight

  constructor(public http: HttpClient, private router: Router) {}
  

  ngOnInit(): void {
    let selections = localStorage.getItem("selections") 
    if(selections) {
      this.genres = JSON.parse(selections)
      this.receivedGenres = this.genres
      this.getTitles()
    } else {
      this.router.navigateByUrl('/')
    }
    
  }

  async getTitles () {
    let result: any 
    //Get titles related to each genre selected
    for(let i = 0; i < this.genres.length; i++) {
      let o = this.selectedOption === 'movies' ? 'movie' : 'tv'
      await this.http.get(`https://api.themoviedb.org/3/discover/${o}?api_key=${environment.apiKey}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=
      ${this.genres[i]}&with_watch_monetization_types=flatrate`).subscribe((data) => {
        result = data
        result.results.length = 10
        for(let i = 0; i < result.results.length; i++) {
          this.results.push(result.results[i])
        }
        //Return the full array but shuffled
        this.results = _.shuffle(this.results.filter((v,i,a) => a.findIndex(t=>(t.id===v.id))===i))
      })
    }
    // End loading screen
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }

  changeComponent(component: string) {
    this.router.navigate(['/'+component]);
  }

  check (item: Title) {
    let title = document.getElementById(`${item.id}`)
    let finished = document.getElementById("finished")
    //Check the item if it hasn't been checked, otherwise uncheck it.
    if(title?.hasAttribute('checked')){
      title.removeAttribute('checked')
      if(this.titles.includes(item)){
       this.titles =  _.without(this.titles, item)
      }
    } else {
      title?.setAttribute('checked', `${this.checked}`)
      if(!this.titles.includes(item)) {
        this.titles.push(item)
      }
    }
    //Disable and remove disable for button once user has selected a genre
    if(this.titles.length < 1) {
      finished?.setAttribute("disabled", "disabled")
      localStorage.removeItem("title_ids")
    } else {
      finished?.removeAttribute("disabled")
      localStorage.setItem("titles", JSON.stringify(this.titles))
    }  
  }


}
