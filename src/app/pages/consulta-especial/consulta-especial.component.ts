import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { map, Observable, switchMap } from 'rxjs';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamenDTO } from 'src/app/_model/consultaListaDTO';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Especialidad } from 'src/app/_model/especialidad';
import { Examen } from 'src/app/_model/examen';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-consulta-especial',
  templateUrl: './consulta-especial.component.html',
  styleUrls: ['./consulta-especial.component.css']
})
export class ConsultaEspecialComponent implements OnInit {

  myControl!:string;
  medicos:Medico[]=[];
  pacientes?:Paciente[]=[];
  especialidades:Especialidad[]=[];
  examenes:Examen[]=[];
  detalleConsulta?:DetalleConsulta[]= [];
  examenSeleccionado?:Examen;




  form!:FormGroup;
  pacientesFiltrados$!:Observable<Paciente[]>;
  medicosFiltrados$!:Observable<Medico[]>;
  especialidades$!:Observable<Especialidad[]>;
  examenesSeleccionados?:Examen[]=[];

  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();
  myControlEspecialidad:FormControl = new FormControl();

  constructor(
    private pacienteService:PacienteService,
    private medicoService:MedicoService,
    private consultaService:ConsultaService,
    private especialidadService:EspecialidadService,
    private examenService:ExamenService,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'especiliadad': new FormControl(),
      'medico':this.myControlMedico,
      'fecha': new FormControl(new Date()),
      'diagnostico':new FormControl(''),
      'tratamiento':new FormControl('')
    });

    this.listarInicial();
    this.cargarEventosAutoComplete();
    
  }

  cargarEventosAutoComplete(){
    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(
      map(val => this.filtrarPacientes(val)!)
    );

    this.medicosFiltrados$ = this.myControlMedico.valueChanges.pipe(
      map(val=>this.filtrarMedicos(val)!)
    )
  }

  listarInicial(){
    this.pacienteService.findAll().subscribe(data=>{
      this.pacientes=data;
    });

    this.medicoService.findAll().subscribe(data=>{
      this.medicos=data;
    });

    this.especialidadService.findAll().subscribe(data=>{
      this.especialidades=data;
    });

    this.examenService.findAll().subscribe(data=>{
      this.examenes=data;
    });
  }

  filtrarPacientes(val:any){
   if(val!=null && val.idPaciente>0){
    return this.pacientes?.filter(el=> el.nombres.toLowerCase().includes(val.nombres.toLowerCase()));
   }else{
    return this.pacientes?.filter(el=> el.nombres.toLowerCase().includes(val.toLowerCase()) );
   }
 
  }

  filtrarMedicos(val:any){
    if(val!=null && val.idMedico>0){
      return this.medicos.filter(el=>el.nombres?.toLocaleLowerCase().includes(val.nombres));
    }else{
      return this.medicos.filter(el=>el.nombres?.toLocaleLowerCase().includes(val)) ;
    }
  }

  mostrarPaciente(val: any){
    return val ? `${val.nombres} ${val.apellidos}`: val;
  }

  mostrarMedico(val: any){
    return val? `${val.nombres} ${val.apellidos}`:val;

  }

  removeElement(i:number){
    this.detalleConsulta?.splice(i,1);
  }

  agregarExamen(){
    if(this.examenSeleccionado){
      this.examenesSeleccionados?.push(this.examenSeleccionado!)
    }   
  }

  agregar(){
    if(this.form.controls["diagnostico"] && this.form.controls["tratamiento"]){
      let det=new DetalleConsulta();
      det.diagnostico=this.form.value["diagnostico"]!;
      det.tratamiento=this.form.value["tratamiento"];
      this.detalleConsulta?.push(det);
    }else{
      this.snackBar.open('Debe agregar un diagnostico y tratamiento','Aviso',{duration:2000});
    }
  }

    aceptar(){
  
      let consulta = new Consulta();
      consulta.medicoDTO = this.form.value["medico"];
      consulta.especialidadDTO = this.form.value["especialidad"];
      consulta.pacienteDTO =this.form.value["paciente"] ;
      consulta.fecha = moment(this.form.value["fecha"]!).format('YYYY-MM-DDTHH:mm:ss');
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
      this.form.reset;
      this.detalleConsulta =[];
      this.examenesSeleccionados = [];
      this.examenSeleccionado = new Examen();
    }
    
    remover(index:number){
      console.log(index);
      this.examenesSeleccionados?.slice(index,2);
    }
  
}
