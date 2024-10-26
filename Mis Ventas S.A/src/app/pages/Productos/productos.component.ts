
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption} from '@angular/forms';
import { IProducto } from 'src/app/Interfaces/IProduto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator'
import {NgbModal,NgbModalConfig,NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { ProductosModificarComponent } from './productos-modificar/productos-modificar.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public numTab = 0;
  cardImageBase64: "assets/img/users/user-default.png";
  form: FormGroup = new FormGroup({});  //formulario reactivo
  lstProductos:IProducto[] = new Array();

  desde = 0;
  hasta = 5;
  pageSize = 5; //se muestran de 5 en 5
  @ViewChild('paginadorProductos')
  paginador: MatPaginator

  //ALERTAS O AVISOS
  @ViewChild ('Msg')
  private msgTpl: TemplateRef<any>;
  mensajeAdvertencia = ""; //variable que sirve para mostrar mensajes de advertencia.

  //mensaje de eliminar.
  @ViewChild ('confirmEliminar')
  private confirmEliminarTpl: TemplateRef<any>;

  dialogConfig = new MatDialogConfig();

  constructor(
    private fb: FormBuilder,
    private sProducto: ProductosService,
    private sNotif:NotificacionesService,
    public  modalService: NgbModal, 
    public dialog: MatDialog,

  ){
        //nada
        this.dialogConfig.maxHeight = '90vh'; //le da el tamanio al dialog 
        this.dialogConfig.width = '130vh';
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
  }

    /**
   * Funcion que permite pasar a la otra pagina de la tabla con la informacion.
   * @param event 
   */
    refreshPage(event:any){
      this.desde = event.pageIndex * event.pageSize;
      this.hasta = this.desde + event.pageSize;
      
    }

    esIterable(obj: any): boolean {
      return obj != null && typeof obj[Symbol.iterator] === 'function';
    }

  /**
   * Funcion que realiza una busqueda por texto de los atributos de interes del producto
   */
  async buscarPorTexto(){
    if(this.valueInputSearch !== null && this.valueInputSearch !== ""){
      await this.sProducto.getSpecifProducto(this.valueInputSearch.toLowerCase()).then(result =>{
        if(this.esIterable(result)){ //hay mas de un resultado
          this.lstProductos = result;
        }else{ //solo hay un resultado
          this.lstProductos.push(result);
        }
      });
    }else{
      this.sNotif.info('No hay texto en el barra de busqueda para realizar su peticion.');
    }
  }


  modifyProducto(codigo:any){
    this.dialogConfig.data = {
      "codigoProducto" : codigo
    }

    const dialogRef = this.dialog.open(ProductosModificarComponent,this.dialogConfig);

    dialogRef.afterClosed().subscribe(  result=>{
              this.valueInputSearch = "";
              this.getAllProductosDB();
    });
  }

  async deleteProducto(codigo:any){
      await this.sProducto.deleteProducto(codigo).then(data =>{
        this.sNotif.success("Producto Eliminado.")
        this.getAllProductosDB();
      }, error =>{
        this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
        console.log("Error intentando crear un producto , durante la comunicacion con la base de datos, rivisar que paso: " + error);
      }
    );
  }

  async crearProducto(){
      let datos = {
        // codigoProducto : this.form.controls['codigoProducto'].value === ""? null : this.form.controls['codigoProducto'].value,
        codigoProveedor : this.form.controls['codigoProveedor'].value === ""? null : this.form.controls['codigoProveedor'].value,
        descripcion : this.form.controls['descripcion'].value,
        existenciaMinima : this.form.controls['existenciaMinima'].value,
        fechaVencimiento : this.form.controls['fechaVencimiento'].value === ""? null : this.form.controls['fechaVencimiento'].value, //me aseguro que el campo de telefono no vaya vacio.
        ubicacionFisica : this.form.controls['ubicacionFisica'].value === ""? null : this.form.controls['ubicacionFisica'].value, //me aseguro que el campo de telefono no vaya vacio.
      }
      
      this.registrarProducto(datos);
      
  }


    async registrarProducto(datos:any){
    console.log(datos);
    await this.sProducto.regProducto(datos).then(async data =>{
      console.log(data);
      this.sNotif.success('El producto se ha creado');
      this.form.reset();
    }, error =>{
      this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
      console.log("Error intentando crear un producto , durante la comunicacion con la base de datos, rivisar que paso: " + error);
    });
  }

  public getActive(num: number) {
    return this.numTab == num ? "active" : "";
  }

  public showTab1(): void {
    this.numTab = 1;
  }
  public showTab2(): void {
    this.getAllProductosDB();
    this.numTab = 2;
  }


    /**
   * Funcion que Obtiene toda la informacion de la base de datos por medio de una consulta
   */
    async getAllProductosDB(){
      // this.mostrarMsjAviso("probando uno, dos tres");
  
      await this.sProducto.getProducto().then(data =>{
        console.log(data);
        
        this.lstProductos = data;
      }, error =>{
        this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
        console.log("Error intentando obtener productos , durante la comunicacion con la base de datos, rivisar que paso: " + error);
      });
    }


}
