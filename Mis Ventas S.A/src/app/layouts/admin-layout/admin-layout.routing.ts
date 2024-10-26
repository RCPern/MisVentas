import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { ClientesComponent } from 'src/app/pages/clientes/clientes.component';
import { ProductosComponent } from 'src/app/pages/Productos/productos.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'clientes',      component: ClientesComponent },
    { path: 'productos',   component: ProductosComponent },
    { path: 'ventas',         component: null },
    { path: 'notas-credito',          component: null },
    { path: 'paquetes-clientes',           component: null }
];
