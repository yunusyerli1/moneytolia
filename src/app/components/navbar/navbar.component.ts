import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INavbarModel } from '../../helpers/models/INavbarModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() navItems: INavbarModel[]= [];
}
