import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '@app/models/file';
import { Object } from '@app/models/object';
import { ObjectService } from '../object.service';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';
import { ThisReceiver } from '@angular/compiler';

interface ObjectResponse {
  id: number,
  name: string,
  location: string,
  s3_link: string,
  file_name: string,
  file_id: number
}

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
    private objectService: ObjectService,
    private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    const objectId = this.route.snapshot.queryParams['id'];

    if(!this.file.name){
      this.file.name = "Selecione um arquivo"
    }
    
    if (objectId) {
      this.object.id = +objectId;
      this.objectService.get(Number.parseInt(objectId))
        .subscribe(data => {
          console.log(data.data[0])
          const response: ObjectResponse = data.data[0];

          this.file.id = response.file_id;
          this.file.name = response.file_name;

          this.object.id = response.id;
          this.object.location = response.location;
          this.object.name = response.name;
          this.object.file = response.s3_link;

        })
    }
  }

  loadFile(event: any){
    let file = event.target.files[0]
    let reader = new FileReader();
    
    reader.onload = (data => {
      this.file = new File();
      this.file.base64 = data.target?.result;
      this.file.name = file.name;
    });
    
    reader.readAsDataURL(file);
  }

  save(){

    if(!this.validated()) return;

    this.objectService.create({
        name: this.object.name, 
        location: this.object.location, 
        file: this.file, 
        owner: 4})
      .subscribe(data => {
        this.snackBarService.openSnackBar("Patrimônio inserido com sucesso","")
      },)
  }

  validated(){
    
    if(!this.object.name){
      this.snackBarService.openSnackBar("O nome do patrimônio é obrigatorio", "fechar")
      return false
    }
    
    if(!this.object.location){
      this.snackBarService.openSnackBar("A localização do patrimônio é obrigatoria", "fechar")
      return false
    }
    
    if(!this.file.name ){
      this.snackBarService.openSnackBar("É obrigatório anexar uma arquivo de referência", "fechar")
      return false
    }

    return true
  }

  update(){
    if(!this.validated()) return;

    this.objectService.update(this.object.id, {
      name: this.object.name, 
      location: this.object.location, 
      file: this.file, 
      owner: 4})
    .subscribe(data => {
      this.snackBarService.openSnackBar("Patrimônio atualizado com sucesso","fechar");
      this.file = new File();
      this.object = new Object();
      this.file.name = "Selecione um arquivo"
    },)
  }

  
}
