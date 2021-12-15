import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../_model/medico';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico> {

  private medicoCambio = new Subject<Medico[]>();
  private mensajeCambio= new Subject<string>();

  constructor(protected override http:HttpClient) {
    super(http,`${environment.BASE_URI}/medicos`);
  }

  getMedicoCambio(){
   return  this.medicoCambio.asObservable();
  }

  setMedicoCambio(data:Medico[]){
    this.medicoCambio.next(data);
  }

  setMensajeCambio(mensaje:string){
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }
}
