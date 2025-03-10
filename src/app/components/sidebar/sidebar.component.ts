import { Component, Input } from '@angular/core';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { RouterLink, RouterLinkActive  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
  selector: 'app-sidebar',
  imports: [SvgImageComponent, RouterLink, RouterLinkActive, CommonModule, SocialMediaComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() menuItems:any;

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
