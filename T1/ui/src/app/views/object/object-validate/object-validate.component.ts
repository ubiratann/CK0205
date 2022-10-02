import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-validate',
  templateUrl: './object-validate.component.html',
  styleUrls: ['./object-validate.component.css']
})
export class ObjectValidateComponent implements OnInit {

  validation = {
    description: '',
    validated: null
  }

  constructor() { }

  ngOnInit(): void {
  }

  // TODO
  validate() {}
}
