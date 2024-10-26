import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor() { }

   //INFO
   info(mensaje: string) {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      html: mensaje
    })
  }
  //ERROR
  error(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: mensaje
    })
  }
  //SUCCESS
  success(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }
  successTop(mensaje: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
