import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavbarModel } from '../../helpers/models/INavbarModel';
import { SvgImageComponent } from '../../components/svg-image/svg-image.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SidebarResponsiveComponent } from '../../components/sidebar-responsive/sidebar-responsive.component';
import { RouterOutlet } from '@angular/router';
import { CampaignStore } from '../../stores/campaign.store';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterOutlet,
    SvgImageComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarResponsiveComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isSidebarCollapsed: boolean = false;

  sideMenu: INavbarModel[] = [
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

  menuItems: INavbarModel[] = [
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
      title: "Logout",
      route: "/logout",
      isFeatured: true
    },

  ]

  constructor(private campaignStore: CampaignStore) {
    this.campaignStore.init();
   }

  collapseSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
