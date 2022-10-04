import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '@app/models/file';
import { Object } from '@app/models/object';
import { ObjectService } from '../object.service';

@Component({
  selector: 'app-object-update',
  templateUrl: './object-update.component.html',
  styleUrls: ['./object-update.component.css']
})
export class ObjectUpdateComponent implements OnInit {

  object = new Object();
  file: File = new File();

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectService) { }

  ngOnInit(): void {
    const objectId = this.route.snapshot.paramMap.get('objectId')
    if (objectId) {
      this.object.id = +objectId;
    }
  }

  loadFile(event: any){
    let file = event.target.files[0]
    let reader = new FileReader();
    
    reader.onload = (data => {
      this.file.base64 = data.target?.result;
      this.file.name = file.name;
    })
    
    reader.readAsDataURL(file);

  }

  save(){

    this.objectService.create({
        name: this.object.name, 
        location: this.object.location, 
        file: this.file, 
        owner: 1})
      .subscribe(data => {
        console.log(data)
      })
  }

  //TODO
  update(){}

}
