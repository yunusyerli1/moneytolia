import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INavbarModel } from './models/INavbarModel';
import { CommonModule } from '@angular/common';
import { SvgImageComponent } from './components/svg-image/svg-image.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarResponsiveComponent } from './components/sidebar-responsive/sidebar-responsive.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    SvgImageComponent, 
    NavbarComponent, 
    SidebarComponent ,
    SidebarResponsiveComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'moneytolia';

  isSidebarCollapsed: boolean = false;

  sideMenu = [
    {
      title: "Campaigns",
      icon: "megaphone-line",
      route: "/"
    },
    {
      title: "Create Campaigns",
      icon: "add-circle-line",
      route: "/create"
    },
  ]

  menuItems:INavbarModel[] = [
    {
      title: "Campaigns",
      route: "/",
      isFeatured: false
    },
    {
      title: "Create",
      route: "/create",
      isFeatured: false
    },
    {
      title: "Contact",
      route: "/contact",
      isFeatured: true
    },

  ]

  constructor() { }

  collapseSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
