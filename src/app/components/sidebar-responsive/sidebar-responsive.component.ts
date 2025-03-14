import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { INavbarModel } from '../../helpers/models/INavbarModel';

@Component({
  selector: 'app-sidebar-responsive',
  imports: [CommonModule, RouterLink, SvgImageComponent],
  templateUrl: './sidebar-responsive.component.html',
  styleUrl: './sidebar-responsive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarResponsiveComponent {
  @Input() menuItems: INavbarModel[]= [];
  isButtonClicked:boolean = false;
}
