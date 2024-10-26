import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  public static urlAPIS: string = "http://localhost:5161";//OJO CAMBIAR ACA RUTA APIS
  constructor() { }
}
