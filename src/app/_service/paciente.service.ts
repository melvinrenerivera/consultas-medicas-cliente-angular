import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteCambio = new Subject<Paciente[]>();
  private mensajeCambio = new Subject<string>();

  private url:string=`${environment.BASE_URI}/pacientes`;
 
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Paciente[]>(this.url);
  }

  registrar(paciente:Paciente){
    return this.http.post(this.url,paciente)
  }

  modificar(paciente: Paciente){
   return this.http.put(this.url,paciente);
  }

  listarById(id:number){
     return this.http.get<Paciente>(`${this.url}/${id}`)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  //
  getPacienteCambio(){
    return this.pacienteCambio.asObservable();
  }

  setPacienteCamio(pacientes:Paciente[]){
    return this.pacienteCambio.next(pacientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje:string){
    this.mensajeCambio.next(mensaje);
  }

}
