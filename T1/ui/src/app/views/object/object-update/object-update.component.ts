import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '@app/models/file';
import { Object } from '@app/models/object';
import { ObjectService } from '../object.service';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';

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
    const objectId = this.route.snapshot.paramMap.get('objectId')
    
    if(!this.file.name)
    {
      this.file.name = "Selecione um arquivo"
    }
    
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
    
    if(!this.file.base64){
      this.snackBarService.openSnackBar("É obrigatório anexar uma arquivo de referência", "fechar")
      return false
    }

    return true
  }

  //TODO
  update(){}

  
}
