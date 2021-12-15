import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/_model/consulta';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Especialidad } from 'src/app/_model/especialidad';
import { Examen } from 'src/app/_model/examen';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import * as moment from 'moment';
import { ConsultaListaExamenDTO } from 'src/app/_model/consultaListaDTO';
import { ConsultaService } from 'src/app/_service/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

paciente!:Paciente[];
pacientes$!: Observable<Paciente[]>;
medicos$!: Observable<Medico[]>;
especialidades$!: Observable<Especialidad[]>;
examenes$!: Observable<Examen[]>;
fechaMaxima: Date =new Date();
diagnostico?:string;
tratamiento?:string;
detalleConsulta?:DetalleConsulta[]= [];
idPacienteSeleccionado?:number;
idMedicoSeleccionado?:number;
idEspecialidadSeleccionado?:number;
idExamenSeleccionado?:number;
examenSeleccionado?:Examen;
fechaSeleccionado?:Date=new Date();
examenesSeleccionados?:Examen[]=[];

  constructor(
    private pacienteService:PacienteService,
    private medicoService:MedicoService,
    private especialidadService:EspecialidadService,
    private examenService:ExamenService,
    private snackBar:MatSnackBar,
    private consultaService:ConsultaService
  ) { }

  ngOnInit(): void {
    this.listarPaciente();
    this.listarMedicos();
    this.listarEspecialidades();
    this.listarExamenes();

  }

  listarPaciente(){
    //this.pacienteService.findAll().subscribe(data=>{
      //this.paciente = data;
    //})
    this.pacientes$ = this.pacienteService.findAll();
  }

  listarMedicos(){
    this.medicos$ = this.medicoService.findAll();
  }

  listarEspecialidades(){
    this.especialidades$ = this.especialidadService.findAll();
  }
  listarExamenes(){
    this.examenes$ = this.examenService.findAll();
  }

  dateChange(e:any){
   // console.log(e);
  }

  agregar(){
    if(this.diagnostico && this.tratamiento){
      console.log('llego');
      let det=new DetalleConsulta();
      det.diagnostico=this.diagnostico!;
      det.tratamiento=this.tratamiento!;
      this.detalleConsulta?.push(det);
    }else{
      this.snackBar.open('Debe agregar un diagnostico y tratamiento','Aviso',{duration:2000});
    }
   
  }

  removeElement(i:number){
    this.detalleConsulta?.splice(i,1);
  }

  agregarExamen(){
    if(this.examenSeleccionado){
      this.examenesSeleccionados?.push(this.examenSeleccionado!)
    }   
  }

  remover(index:number){
    console.log(index);
    this.examenesSeleccionados?.slice(index,2);
  }

  aceptar(){

    console.log('llego');
    let medico=new Medico();
    medico.idMedico = this.idMedicoSeleccionado;

    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado!;

    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado!;

    let consulta = new Consulta();
    consulta.medicoDTO = medico;
    consulta.especialidadDTO = especialidad;
    consulta.pacienteDTO = paciente;
    consulta.fecha = moment(this.fechaSeleccionado!).format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsultas = this.detalleConsulta!;
    consulta.numConsultorio = "C1";

    let consultaListaDto= new ConsultaListaExamenDTO();
    consultaListaDto.consulta = consulta;
    consultaListaDto.lstExamen = this.examenesSeleccionados!;

    this.consultaService.registrarTransaccion(consultaListaDto).subscribe(data=>{
      setTimeout(()=>{
        this.snackBar.open('Se registro con exito','AVISO',{duration:2000});
        this.limpiarControles();
      },2000);
    });
   
  }

  limpiarControles(){
    this.detalleConsulta =[];
    this.examenesSeleccionados = [];
    this.diagnostico = "";
    this.tratamiento ="";
    this.idPacienteSeleccionado =0;
    this.idEspecialidadSeleccionado =0;
    this.idMedicoSeleccionado =0;
    this.examenSeleccionado = new Examen();
  }

}
