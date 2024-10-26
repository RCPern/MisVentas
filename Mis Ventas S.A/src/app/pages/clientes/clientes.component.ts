
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption} from '@angular/forms';
import { ICliente } from 'src/app/Interfaces/ICliente';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator'
import {NgbModal,NgbModalConfig,NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';

import { ClientesModificarComponent } from './clientes-modificar/clientes-modificar.componet';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public numTab = 0;
  cardImageBase64: "assets/img/users/user-default.png";
  form: FormGroup = new FormGroup({});  //formulario reactivo
  textButton: "Crear Cliente"
  lstCliente:ICliente[] = new Array();

  desde = 0;
  hasta = 5;
  pageSize = 5; //se muestran de 5 en 5
  @ViewChild('paginadorClientes')
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
    private sCliente: ClientesService,
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
      // codigoCliente:['',[Validators.min( 0),Validators.max( 9999999999991)]],
      NIT:['',[ Validators.min( 0), Validators.max( 999999991)]],
      nombres:['',[Validators.required,Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      apellidos:['', [Validators.required,Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      direccion:['',[Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      categoriaCliente:['',[Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
      estadoCliente:['',[Validators.pattern("[a-zA-ZÀ-ÿ\u00f1\u00d1\u00b4\u002d\u2019' ]+")]],
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
   * Funcion que realiza una busqueda por texto de los atributos de interes del cliente
   */
  async buscarPorTexto(){
    if(this.valueInputSearch !== null && this.valueInputSearch !== ""){
      
      await this.sCliente.getSpecifClientes(this.valueInputSearch.toLowerCase()).then(result =>{
        if(this.esIterable(result)){ //hay mas de un resultado
          this.lstCliente = result;
        }else{ //solo hay un resultado
          this.lstCliente.push(result);
        }

      },error =>{
        this.sNotif.error("No se encontro el cliente")
        console.log("Error intentando buscar a un cliente , durante la comunicacion con la base de datos, rivisar que paso: " + error);
      });
    }else{
      this.sNotif.info('No hay texto en el barra de busqueda para realizar su peticion.');
    }
  }

  async accionarBtn(){
    await this.crearCliente();
  }


  modifyCliente(codigo:any){

    this.dialogConfig.data = {
      "codigoCliente" : codigo
    }

    const dialogRef = this.dialog.open(ClientesModificarComponent,this.dialogConfig);

    dialogRef.afterClosed().subscribe(  result=>{
              this.valueInputSearch = "";
              this.getAllClientsDB();
    });
  }

  async deleteCliente(codigo:any){
    console.log(codigo);
    await this.sCliente.deleteCliente(codigo).then(data =>{
      this.sNotif.success("El estudiante fue dado de baja.")
      this.getAllClientsDB();
    },error =>{
      this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
      console.log("Error intentando eliminar un cliente , durante la comunicacion con la base de datos, rivisar que paso: " + error);
      
    });
  }

  async crearCliente(){
      let datos = {
        // codigoCliente : this.form.controls['codigoCliente'].value === ""? null : this.form.controls['codigoCliente'].value,
        NIT : this.form.controls['NIT'].value === ""? null : this.form.controls['NIT'].value,
        nombres : this.form.controls['nombres'].value,
        apellidos : this.form.controls['apellidos'].value,
        direccion : this.form.controls['direccion'].value === ""? null : this.form.controls['direccion'].value, //me aseguro que el campo de telefono no vaya vacio.
        categoriaCliente : this.form.controls['categoriaCliente'].value === ""? null : this.form.controls['categoriaCliente'].value, //me aseguro que el campo de telefono no vaya vacio.
        estadoCliente : this.form.controls['estadoCliente'].value === ""? null : this.form.controls['estadoCliente'].value, //me aseguro que el campo de telefono no vaya vacio.
      }
      
      this.registrarCliente(datos);
  }


    async registrarCliente(datos:any){
      console.log(datos);
      
    await this.sCliente.regCliente(datos).then(async data =>{
      this.form.reset();
      this.sNotif.success('El cliente se ha creado');
    }, error =>{
      this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
      console.log("Error intentando crear un cliente , durante la comunicacion con la base de datos, rivisar que paso: " + error);
    });
  }

  public getActive(num: number) {
    return this.numTab == num ? "active" : "";
  }

  public showTab1(): void {
    this.numTab = 1;
  }
  public showTab2(): void {
    this.numTab = 2;
    this.getAllClientsDB();
  }

  /**
   * Funcion que Obtiene toda la informacion de la base de datos por medio de una consulta
   */
  async getAllClientsDB(){
    // this.mostrarMsjAviso("probando uno, dos tres");

    await this.sCliente.getClientes().then(data =>{
      console.log(data);
      
      this.lstCliente = data;
    }, error =>{
      this.sNotif.error("Problemas de comunicación internos, comuniquese con un encargado.")
      console.log("Error intentando obtener productos , durante la comunicacion con la base de datos, rivisar que paso: " + error);
    });
  }


}
