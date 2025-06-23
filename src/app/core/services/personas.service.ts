import { Persona } from './../models/persona';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';  // Importamos ApiService para hacer las llamadas HTTP
import { Observable } from 'rxjs';  // Usamos Observable para el retorno
import { catchError } from 'rxjs/operators';  // Para manejar errores

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private apiUrl = 'Personas'; // URL de la API

  constructor(private apiService: ApiService) {}  // Inyectamos ApiService en lugar de HttpClient

  // Método para obtener la lista de personas
  getPersonas(): Observable<Persona[]> {
    // Usamos el ApiService para hacer la llamada GET
    return this.apiService.get<Persona[]>(this.apiUrl).pipe(
      catchError((error) => {
        // Aquí puedes manejar los errores o hacer logging si es necesario
        console.error('Error en obtener personas:', error);
        return [];
      })
    );
  }


  insertPersona(persona: Persona): Observable<Persona> {
    return this.apiService.post<Persona>(this.apiUrl, persona).pipe(
      catchError((error) => {
        // Aquí puedes manejar los errores o hacer logging si es necesario
        console.error('Error en Insertar persona:', error);
        return [];
      })
    );
  }
}
