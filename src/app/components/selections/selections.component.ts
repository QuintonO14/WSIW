import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.less']
})
export class SelectionsComponent implements OnInit {

  constructor(private router: Router) {
    localStorage.clear()
   }

  ngOnInit(): void {
  }

  goToGenres(selection: string) {
    localStorage.setItem("option", selection)
    this.router.navigate(['/genres']);
  }  

}
