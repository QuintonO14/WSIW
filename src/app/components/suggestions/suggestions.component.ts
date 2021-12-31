import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash'
import { Router } from '@angular/router'

interface Recommendation {
  adult?: boolean
  backdrop_path: string
  first_air_date?: string
  genre_ids: []
  genre_names: Genre[]
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

interface Genre {
  name: string;
  id: number
}

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.less']
})
export class SuggestionsComponent implements OnInit {
  titles: Recommendation[] = []
  recommendations: Recommendation[] = []
  loading: boolean = true
  

  constructor(public http : HttpClient, private router: Router) {}

  ngOnInit(): void {
    let titles = localStorage.getItem("titles")
    if(titles) {
      this.titles = JSON.parse(titles)
      this.getRecommendations()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  home() {
    this.router.navigateByUrl('/')
  }

  seeMore() {
    window.scrollTo({top: window.innerHeight})
  }
  

  getRecommendations() {
      let result: any = []
      let option: any = localStorage.getItem("option")
      let o = option === 'movies' ? 'movie' : 'tv'
      //Gather suggestions for all selected titles
      for(let i = 0; i < this.titles.length; i++) {
      this.http.get(`https://api.themoviedb.org/3/${o}/${this.titles[i].id}}/recommendations?api_key=${environment.apiKey}&language=en-US&page=1`)
          .subscribe((data) => {
            result = data;
            result.results.sort((a: { vote_average: number; }, b: { vote_average: number; }) => b.vote_average - a.vote_average);
            // Handle results returned based off selected titles length
            if(o === 'movie') {
              if(this.titles.length < 5) {
                result.results.length = 10
              } else {
                result.results.length = 5
              }
            } else {
              if(this.titles.length < 5) {
                result.results.length = 10
              } else {
                result.results.length = 3
              }
            }
            //Add all results to recommendations
            for(let i = 0; i < result.results.length; i++){
              this.recommendations.push(result.results[i])
            }
            //Filter all duplicates and any titles that were selected previously from recommendations
            this.recommendations = this.recommendations.filter((v,i,a) => a.findIndex(t=>(t.id===v.id))===i)
            .sort((a,b) => Math.random() - 0.5)
            this.recommendations = this.recommendations.filter((x) => !this.titles.find(y => y.id === x.id))
          })
      }
      //End loading screen
      setTimeout(() => {
        this.loading = false
      }, 2000)
  }

}
