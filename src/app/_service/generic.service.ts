import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http:HttpClient,
    @Inject("url") protected url:string
  ) { }

  findAll(){
    return this.http.get<T[]>(this.url);
  }

  listarById(id:number){
    return this.http.get<T>(`${this.url}/${id}`)
 }

  registrar(t:T){
    return this.http.post(this.url,t)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  modificar(t: T){
    return this.http.put(this.url,t);
   }
 

}
