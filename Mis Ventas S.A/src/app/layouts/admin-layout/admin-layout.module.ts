import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
// import { ToastrModule } from 'ngx-toastr';
import { ClientesComponent } from 'src/app/pages/clientes/clientes.component';
import { ProductosComponent } from 'src/app/pages/Productos/productos.component';
import { ClientesModificarComponent } from 'src/app/pages/clientes/clientes-modificar/clientes-modificar.componet';
import { ProductosModificarComponent } from 'src/app/pages/Productos/productos-modificar/productos-modificar.component';

import {NzTreeSelectModule} from 'ng-zorro-antd/tree-select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';


import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {CommonModule, DatePipe} from '@angular/common';


@NgModule({
  imports: [
    MatDatepickerModule,MatFormFieldModule,MatNativeDateModule,MatInputModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NzTreeSelectModule,
    NzDatePickerModule,
    NzSelectModule,
    NzModalModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NgbAlertModule,
    NgbPaginationModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers:[
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    // { provide: DynamicComponentService, useValue:{}}
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ClientesComponent,
    ProductosComponent,
    ClientesModificarComponent,
    ProductosModificarComponent
  ],
  entryComponents: [
    ClientesModificarComponent
]
})

export class AdminLayoutModule {}
