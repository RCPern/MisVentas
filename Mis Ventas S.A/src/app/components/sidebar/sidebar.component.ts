import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/clientes', title: 'Clientes',  icon: 'ni-circle-08 text-primary', class: '' },
    { path: '/productos', title: 'Productos',  icon:'ni-box-2 text-blue', class: '' },
    { path: '/ventas', title: 'Ventas',  icon:'ni-spaceship text-orange', class: '' },
    { path: '/notas-credito', title: 'Notas Credito',  icon:'ni-credit-card text-yellow', class: '' },
    { path: '/paquetes-clientes', title: 'Paquetes Clientes',  icon:'ni-world text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
