import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EscecialidadComponent } from './pages/escecialidad/escecialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteNuevoComponent } from './pages/paciente/paciente-nuevo/paciente-nuevo.component';
import { PacienteComponent } from './pages/paciente/paciente.component';

const routes: Routes = [
  {
    path: 'paciente',
    component: PacienteComponent,
    children:[
      {
        path: 'nuevo',
        component: PacienteEdicionComponent
      },
      {
        path: 'editar/:id',
        component: PacienteEdicionComponent
      }
    ]
  },
  {
    path: 'medico',
    component: MedicoComponent
  },
  {
    path:'examen',
    component:ExamenComponent
},
{
  path:'especialidad',
  component:EscecialidadComponent
},
{
  path:'consulta',
  component:ConsultaComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
