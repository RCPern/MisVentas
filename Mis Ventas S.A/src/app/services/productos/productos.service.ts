import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from '../variables/global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  
  public data: any;
  urlApis = GlobalVariablesService.urlAPIS;

  constructor(private http: HttpClient) { }

  //---------------------------------METODOS POST----------------------------------

  regProducto(data:any){
    return this.http.post<any>(this.urlApis + '/api/Producto', data).toPromise();
  }

  //---------------------------------METODOS GET---------------------------------
  getProducto() {
    return this.http.get<any>(this.urlApis + '/api/Producto').toPromise();
  }

  getSpecifProducto(atr:any) {
    return this.http.get<any>(this.urlApis + '/api/Producto/'+atr).toPromise();
  }

  //---------------------------------METODOS PUT---------------------------------
  updateProducto(atr:any,data: any) {
    return this.http.put<any>(this.urlApis + '/api/Producto/'+atr, data).toPromise();
  }
  //---------------------------------METODOS DELETE---------------------------------
  deleteProducto(codProducto:any) {
    return this.http.delete<any>(this.urlApis + '/api/Producto/'+ codProducto).toPromise();
  }
}
