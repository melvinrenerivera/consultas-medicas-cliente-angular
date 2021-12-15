import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  pacientes!: Paciente[];
  displayedColumns = ["idPaciente","nombres","apellidos","acciones"];
  dataSource!: MatTableDataSource<Paciente>;

  constructor(private pacienteService:PacienteService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.pacienteService.getPacienteCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.pacienteService.getMensajeCambio().subscribe(data=>{
        this.snackBar.open(data,'AVISO',{duration:2000});
    })

    this.pacienteService.findAll()
    .subscribe((data) =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(id:number){
    this.pacienteService.delete(id).subscribe(()=>{
      this.pacienteService.findAll().subscribe(data=>{
        this.pacienteService.setPacienteCamio(data);
        this.pacienteService.setMensajeCambio('Se elimino');
      });
      
    });
  }



}


  