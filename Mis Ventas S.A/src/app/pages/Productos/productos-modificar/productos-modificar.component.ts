
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption} from '@angular/forms';
import { IProducto } from 'src/app/Interfaces/IProduto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator'
import {NgbModal,NgbModalConfig,NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-productos-modificar',
  templateUrl: './productos-modificar.component.html',
  styleUrls: ['./productos-modificar.component.scss']
})
export class ProductosModificarComponent implements OnInit {


  form: FormGroup = new FormGroup({});  //formulario reactivo
  lstProductos:IProducto[] = new Array();

  //ALERTAS O AVISOS
  @ViewChild ('Msg')
  private msgTpl: TemplateRef<any>;
  mensajeAdvertencia = ""; //variable que sirve para mostrar mensajes de advertencia.

  //mensaje de eliminar.
  @ViewChild ('confirmEliminar')
  private confirmEliminarTpl: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private sProducto: ProductosService,
    private sNotif:NotificacionesService,
    public  modalService: NgbModal, 
    public dialogRef: MatDialogRef<ProductosModificarComponent>, @Inject(MAT_DIALOG_DATA) public data,

  ){
    //nada
  }

    //######### FILTROS DE BUSQUEDA ########
    valueInputSearch = "";
    //###################################

  ngOnInit() {

    

    this.form = this.fb.group({
      // codigoProducto:['',[Validators.min( 0),Validators.max( 9999999999991)]],
      codigoProveedor:['',[ Validators.min( 0), Validators.max( 999999991)]],
      descripcion:['',[Validators.required,Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      fechaVencimiento:['', [Validators.required,Validators.pattern("[0-9a-zA-ZÀ-ÿ\u002F\u00AF\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      ubicacionFisica:['',[Validators.pattern("[0-9a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      existenciaMinima:['',[ Validators.min( 0), Validators.max( 999999991)]],
    });
    this.cargarDatos()
  }

  async cargarDatos(){

    
    await this.sProducto.getSpecifProducto(this.data.codigoProducto).then(async data =>{

        let codigoProveedor = this.form.controls['codigoProveedor'];
        let descripcion = this.form.controls['descripcion'];
        let existenciaMinima = this.form.controls['existenciaMinima'];
        let fechaVencimiento = this.form.controls['fechaVencimiento'];
        let ubicacionFisica = this.form.controls['ubicacionFisica']; 
        
        
        codigoProveedor.setValue(data[0].codigoProveedor);
        descripcion.setValue(data[0].descripcion);
        existenciaMinima.setValue(data[0].existenciaMinima);
        fechaVencimiento.setValue(data[0].fechaVencimiento);
        ubicacionFisica.setValue(data[0].ubicacionFisica);

    },error=>{
        this.sNotif.error('Probelmas con cargar la información.')
    });
  }



 async modifyProducto(){
    let datos = {
       codigoProducto : this.data.codigoProducto,
       codigoProveedor : this.form.controls['codigoProveedor'].value === ""? null : this.form.controls['codigoProveedor'].value,
       descripcion : this.form.controls['descripcion'].value,
       existenciaMinima : this.form.controls['existenciaMinima'].value,
       fechaVencimiento : this.form.controls['fechaVencimiento'].value === ""? null : this.form.controls['fechaVencimiento'].value, 
       ubicacionFisica : this.form.controls['ubicacionFisica'].value === ""? null : this.form.controls['ubicacionFisica'].value
      }
      console.log(this.data.codigoProducto,datos);
      
      await this.sProducto.updateProducto(this.data.codigoProducto,datos).then(async data =>{
        this.sNotif.success('Producto Modificado');
        this.dialogRef.close();
      }, error =>{
        this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
        console.log("Error intentando modificar un producto , durante la comunicacion con la base de datos, rivisar que paso: " + error);
      });

  }


}
