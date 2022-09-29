import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showSubSubMenu: boolean = false;
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let test = JSON.parse(localStorage.getItem("user") ?? "") 

    if (test) {
      this.isLoggedIn = true
    }  
  }

}
