import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consulta } from '../_model/consulta';
import { ConsultaListaExamenDTO } from '../_model/consultaListaDTO';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url:string = `${environment.BASE_URI}/consultas`

  constructor(private http:HttpClient) { }

  registrarTransaccion(dto:ConsultaListaExamenDTO){
    return this.http.post(this.url,dto);
  }


}
