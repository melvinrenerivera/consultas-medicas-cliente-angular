import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, switchMapTo } from 'rxjs';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {


  medico!: Medico;

  constructor(
    public dialogRef: MatDialogRef<MedicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService:MedicoService
  ) { }

  ngOnInit(): void {
    this.medico= {...this.data};
  }

  operar(){
    if(this.medico!=null && this.medico.idMedico!=null){
      this.medicoService.modificar(this.medico).pipe(
        switchMap(() => {
          return this.medicoService.findAll();
        })
      ).subscribe(data=>{
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio("Se modifico");
      });
    }else{
      this.medicoService.registrar(this.medico).pipe(switchMap( 
        ()=>{
          return this.medicoService.findAll();
        }
      )).subscribe(data=>{
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio("se Registro");
      });
    }
    this.dialogRef.close(); 
  }

  cancelar(){
    this.dialogRef.close(); 
  }

}
