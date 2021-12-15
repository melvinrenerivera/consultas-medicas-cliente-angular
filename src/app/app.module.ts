import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteNuevoComponent } from './pages/paciente/paciente-nuevo/paciente-nuevo.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenDialogComponent } from './pages/examen/examen-dialog/examen-dialog.component';
import { EscecialidadComponent } from './pages/escecialidad/escecialidad.component';
import { EspecialidadDialogComponent } from './pages/escecialidad/especialidad-dialog/especialidad-dialog.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './pages/consulta/consulta-especial/consulta-especial.component';


@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    MedicoComponent,
    PacienteEdicionComponent,
    PacienteNuevoComponent,
    MedicoDialogoComponent,
    ExamenComponent,
    ExamenDialogComponent,
    EscecialidadComponent,
    EspecialidadDialogComponent,
    ConsultaComponent,
    ConsultaEspecialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule ,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
