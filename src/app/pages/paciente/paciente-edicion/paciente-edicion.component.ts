import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  id!:number;
  form!:FormGroup;
  edicion!:boolean;

  constructor(
    private activeRoute:ActivatedRoute,
    private pacienteService:PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {

   // let id =  this.activeRoute.snapshot.paramMap.get("id");
     this.activeRoute.params.subscribe(data =>{
       this.id = data['id'];
       this.edicion = this.id!=null;
     });

    this.form = new FormGroup({
      idPaciente : new FormControl(),
      nombres: new FormControl(''),
      apellidos:new FormControl(''),
      dni: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('')
    });

    this.initForm();
  }

  initForm(){
    console.log(this.edicion)
    if(this.edicion){
      this.pacienteService.listarById(this.id).subscribe(data => {
        console.log(data);
        this.form = new FormGroup({
          idPaciente : new FormControl(data.idPaciente),
          nombres: new FormControl(data.nombres),
          apellidos:new FormControl(data.apellidos),
          dni: new FormControl(data.dni),
          direccion: new FormControl(data.direccion),
          telefono: new FormControl(data.telefono),
          email: new FormControl(data.email)
        });
      });
    
    }
  }

  registrar(){
    let paciente = new Paciente();
    paciente.idPaciente= this.form.value['idPaciente'];
    paciente.nombres = this.form.value['nombres'];
    paciente.telefono = this.form.value['telefono'];
    paciente.email = this.form.value['email'];
    paciente.dni = this.form.value['dni'];
    paciente.direccion = this.form.value['direccion'];
    paciente.apellidos = this.form.value['apellidos'];

    debugger;
    if(this.edicion){
      //practica comun no ideal
      this.pacienteService.modificar(this.form.value).subscribe(()=>{
        this.pacienteService.findAll().subscribe(data=>{
          this.pacienteService.setPacienteCamio(data);
          this.pacienteService.setMensajeCambio('se modifico el paciente');
        });
      });
    }else{
      //practica ideal usando, operadores reactivos
      this.pacienteService.registrar(this.form.value).pipe(
        switchMap(()=>{
          return this.pacienteService.findAll();
        })
      ).subscribe(data=>{
        this.pacienteService.setPacienteCamio(data);
        this.pacienteService.setMensajeCambio('se modifico el paciente');
      })
    }
  
    this.router.navigate(['paciente']);
    
  }

}
