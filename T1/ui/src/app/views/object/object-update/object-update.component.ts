import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Object } from '@app/models/object';

@Component({
  selector: 'app-object-update',
  templateUrl: './object-update.component.html',
  styleUrls: ['./object-update.component.css']
})
export class ObjectUpdateComponent implements OnInit {

  object = new Object();
  file: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const objectId = this.route.snapshot.paramMap.get('objectId')
    if (objectId) {
      this.object.id = +objectId;
    }
  }

  // TODO
  loadFile(event: any){}

  // TODO
  save(){}

  //TODO
  update(){}

}
