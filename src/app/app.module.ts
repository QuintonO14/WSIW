import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { GenresComponent } from './components/genres/genres.component';
import { SelectionsComponent } from './components/selections/selections.component';
import { PopularComponent } from './components/popular/popular.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    SelectionsComponent,
    PopularComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {path: '', component: SelectionsComponent},
      {path: 'genres', component: GenresComponent},
      {path: 'popular', component: PopularComponent},
      {path: 'suggestions', component: SuggestionsComponent}
    ]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
