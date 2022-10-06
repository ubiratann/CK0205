import { Component, OnInit, Inject } from '@angular/core';
import { ObjectService } from '../object.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';

@Component({
  selector: 'app-object-validate',
  templateUrl: './object-validate.component.html',
  styleUrls: ['./object-validate.component.css']
})
export class ObjectValidateComponent implements OnInit {

  validation = {
    description: '',
    validated: null,
    object: 0,
  }

  constructor(
    private service: ObjectService,
    public dialogRef: MatDialogRef<ObjectValidateComponent>,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: {
      object_id: number
    },
    ) { }

  ngOnInit(): void {
  
  }

  validate() {

    if(!this.validateForm()) return;

    this.validation.object = this.data.object_id;

    this.dialogRef.close();
    this.service.validate(this.validation)
      .subscribe(data => {
        this.snackBarService.openSnackBar("Patrimônio validado com sucesso!", "fechar!")
      })
  }

  validateForm(){
    if(this.validation.description.trim() == ''){
      this.snackBarService.openSnackBar("Insira a descrição da sua validação","fechar")
      return false;
    }
    
    if(!this.validation.validated){
      this.snackBarService.openSnackBar("Defina se o objeto esta validado ou não","fechar")
      return false;
    }

    return true;
  }
}
