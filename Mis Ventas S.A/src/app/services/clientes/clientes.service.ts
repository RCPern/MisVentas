import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from '../variables/global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public data: any;
  urlApis = GlobalVariablesService.urlAPIS;

  constructor(private http: HttpClient) { }

  //---------------------------------METODOS POST----------------------------------

  regCliente(data:any){
    return this.http.post<any>(this.urlApis + '/api/Clientes', data).toPromise();
  }

  //---------------------------------METODOS GET---------------------------------
  getClientes() {
    return this.http.get<any>(this.urlApis + '/api/Clientes').toPromise();
  }

  getSpecifClientes(atr:any) {
    return this.http.get<any>(this.urlApis + '/api/Clientes/'+atr).toPromise();
  }

  //---------------------------------METODOS PUT---------------------------------
  updateCliente(atr:any, data: any) {
    return this.http.put<any>(this.urlApis + '/api/Clientes/'+atr, data).toPromise();
  }
  //---------------------------------METODOS DELETE---------------------------------
  deleteCliente(codCliente:any) {
    return this.http.delete<any>(this.urlApis + '/api/Clientes/'+ codCliente).toPromise();
  }
}
