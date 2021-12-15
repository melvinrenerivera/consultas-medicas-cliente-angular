import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen } from '../_model/examen';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen> {

  private examenCambio = new Subject<Examen[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http:HttpClient) {
    super(http,`${environment.BASE_URI}/examenes`);
  }

  getExamenCambio(){
    return this.examenCambio.asObservable();
  }

  setExamenCambio(examen:Examen[]){
    this.examenCambio.next(examen);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje:string){
    this.mensajeCambio.next(mensaje);
  }




}
