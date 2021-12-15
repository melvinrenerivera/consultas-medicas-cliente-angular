import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen-dialog',
  templateUrl: './examen-dialog.component.html',
  styleUrls: ['./examen-dialog.component.css']
})
export class ExamenDialogComponent implements OnInit {

  examen!:Examen;

  constructor(
    public dialogRef: MatDialogRef<ExamenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Examen,
    private examenService:ExamenService
  ) { }

  ngOnInit(): void {
    this.examen = {...this.data};
  }

  aceptar(){
    if(this.examen.idExamen){
      console.log(this.data);
      this.examenService.modificar(this.examen).pipe(
        switchMap(()=>{
          return this.examenService.findAll();
        })
      ).subscribe(data=>{
         this.examenService.setExamenCambio(data);
         this.examenService.setMensajeCambio("editado con exito");               
      });
    }else{
      this.examenService.registrar(this.examen).pipe(
        switchMap(()=>{
          return this.examenService.findAll();
        })
      ).subscribe(data=>{
        this.examenService.setExamenCambio(data);
        this.examenService.setMensajeCambio("editado con exito"); 
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }
  

}
