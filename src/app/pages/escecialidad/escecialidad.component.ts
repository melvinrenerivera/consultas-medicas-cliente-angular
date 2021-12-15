import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-escecialidad',
  templateUrl: './escecialidad.component.html',
  styleUrls: ['./escecialidad.component.css']
})
export class EscecialidadComponent implements OnInit {

  especialidades?:Especialidad[];
  displayedColumns:string[] = ['idEspecialidad','nombre','acciones'];
  dataSource!: MatTableDataSource<Especialidad>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private especiadadService:EspecialidadService
  ) { }

  ngOnInit(): void {
    this.especiadadService.findAll().subscribe((data:Especialidad[])=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(value:any){
    //this.dataSource.filter(value.)
  }

  operar(especialidad?:any){
    if(especialidad?.idEspecialidad){
      this.especiadadService.modificar(especialidad).pipe(
        switchMap(()=>{
          return this.especiadadService.findAll();
        })
      ).subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }else{
      this.especiadadService.registrar(especialidad).pipe(
        switchMap(()=>{especialidad
          return this.especiadadService.findAll();
        })
      ).subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  eliminar(id:number){
    this.especiadadService.delete(id);
  }

}
