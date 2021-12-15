import { DetalleConsulta } from "./detalleConsulta";
import { Especialidad } from "./especialidad";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Consulta{
   "idConsulta":number;
   "pacienteDTO":Paciente;
   "medicoDTO":Medico;
   "especialidadDTO":Especialidad;
   "fecha": string;
   "detalleConsultas": DetalleConsulta[];
   "numConsultorio":string;
}