
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption} from '@angular/forms';
import { ICliente } from 'src/app/Interfaces/ICliente';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator'
import {NgbModal,NgbModalConfig,NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';


@Component({
  selector: 'app-clientes-modificar',
  templateUrl: './clientes-modificar.component.html',
  styleUrls: ['./clientes-modificar.component.scss']
})
export class ClientesModificarComponent implements OnInit {

  form: FormGroup = new FormGroup({});  //formulario reactivo

  //ALERTAS O AVISOS
  @ViewChild ('Msg')
  private msgTpl: TemplateRef<any>;
  mensajeAdvertencia = ""; //variable que sirve para mostrar mensajes de advertencia.

  //mensaje de eliminar.
  @ViewChild ('confirmEliminar')
  private confirmEliminarTpl: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private sCliente: ClientesService,
    private sNotif:NotificacionesService,
    public  modalService: NgbModal, 
    public dialogRef: MatDialogRef<ClientesModificarComponent>, @Inject(MAT_DIALOG_DATA) public data,
  ){
    //nada
  }

    //######### FILTROS DE BUSQUEDA ########
    valueInputSearch = "";
    //###################################

  ngOnInit() {
    
    this.form = this.fb.group({
      // codigoCliente:['',[Validators.min( 0),Validators.max( 9999999999991)]],
      NIT:['',[ Validators.min( 0), Validators.max( 999999991)]],
      nombres:['',[Validators.required,Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      apellidos:['', [Validators.required,Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      direccion:['',[Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      categoriaCliente:['',[Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      estadoCliente:['',[Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
    });
   
    this.cargarDatos()
    
  }


  async cargarDatos(){

    
    await this.sCliente.getSpecifClientes(this.data.codigoCliente).then(async data =>{
        let NIT = this.form.controls['NIT'];
        let nombres = this.form.controls['nombres'];
        let apellidos = this.form.controls['apellidos'];
        let direccion = this.form.controls['direccion']; 
        let categoriaCliente = this.form.controls['categoriaCliente']; 
        let estadoCliente = this.form.controls['estadoCliente'];
        
        NIT.setValue(data[0].nit);
        nombres.setValue(data[0].nombres);
        apellidos.setValue(data[0].apellidos);
        direccion.setValue(data[0].direccion);
        categoriaCliente.setValue(data[0].categoriaCliente);
        estadoCliente.setValue(data[0].estadoCliente);
    },error=>{
        this.sNotif.error('Probelmas con cargar la información.')
    });
  }

  async modifCliente(){
      let datos = {
        codigoCliente : this.data.codigoCliente,
        NIT : this.form.controls['NIT'].value === ""? null : this.form.controls['NIT'].value,
        nombres : this.form.controls['nombres'].value,
        apellidos : this.form.controls['apellidos'].value,
        direccion : this.form.controls['direccion'].value === ""? null : this.form.controls['direccion'].value, 
        categoriaCliente : this.form.controls['categoriaCliente'].value === ""? null : this.form.controls['categoriaCliente'].value, 
        estadoCliente : this.form.controls['estadoCliente'].value === ""? null : this.form.controls['estadoCliente'].value, 
      }
      
      this.modificarCliente(datos);
  }


    async modificarCliente(datos:any){
    //   console.log(datos);
      
    await this.sCliente.updateCliente(this.data.codigoCliente,datos).then(async data =>{
      this.sNotif.success('Cliente Modificado');
      this.dialogRef.close();
    }, error =>{
      this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
      console.log("Error intentando modificar un cliente , durante la comunicacion con la base de datos, rivisar que paso: " + error);
    });
  }




}
