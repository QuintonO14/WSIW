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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
