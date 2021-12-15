import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ThisReceiver } from '@angular/compiler';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medicos! : Medico[];
  displayedColumns: string[] = ['idMedico', 'nombres', 'apellidos', 'cmp','fotoUrl','acciones'];
  dataSource = new MatTableDataSource<Medico>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private medicoService:MedicoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

 

  ngOnInit(): void {

    this.medicoService.getMedicoCambio().subscribe(data=>{
      this.medicos = data;
      this.dataSource = new MatTableDataSource<Medico>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

   this.medicoService.getMensajeCambio().subscribe(data=>{
      this.snackBar.open(data,'Undo', {
        duration: 3000});
   });

    this.medicoService.findAll().subscribe(data=>{
      this.medicos = data;
      this.dataSource = new MatTableDataSource<Medico>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  abrirDialog(medico?:Medico): void {
      this.dialog.open(MedicoDialogoComponent,{
        width:'100%',
        data:medico
      });
  }

  applyFilter(event:Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = (filterValue.trim().toLowerCase());
  }

}
