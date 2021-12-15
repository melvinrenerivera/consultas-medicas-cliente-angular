import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';
import { ExamenDialogComponent } from './examen-dialog/examen-dialog.component';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns:string[]=['idExamen','nombre','descripcion','accion'];
  dataSource! : MatTableDataSource<Examen>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private examenService:ExamenService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar
  ) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.examenService.getExamenCambio().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    });
    this.examenService.getMensajeCambio().subscribe(data=>{
      this.snackBar.open(data,'AVISO',{duration:2000})
    });


    this.examenService.findAll().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  
  }

  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  operar(examen?:Examen){
    this.dialog.open(ExamenDialogComponent,{
      width: '100%',
      data: examen,
    })
  }

  eliminar(id:number){
    this.examenService.delete(id).pipe(
      switchMap(()=>{
        return this.examenService.findAll();
      })
    ).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }



}
