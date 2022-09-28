import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Gerenciador de Patrimonios';
  loggedIn: boolean = false;

  constructor(){}

  ngOnInit(): void {

    let test = JSON.parse(localStorage.getItem("user") ?? "") 

    if (test) {
      this.loggedIn = true
    }  
  }
}
