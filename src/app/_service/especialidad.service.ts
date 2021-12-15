import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../_model/especialidad';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService  extends GenericService<Especialidad>{

  constructor(
    protected override http:HttpClient
  ) {
    super(http,`${environment.BASE_URI}/especialidades`);
  }
}
