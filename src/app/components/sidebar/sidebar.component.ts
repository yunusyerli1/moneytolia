import { Component, Input, OnInit } from '@angular/core';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
  selector: 'app-sidebar',
  imports: [SvgImageComponent, RouterLink, CommonModule, SocialMediaComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  @Input() menuItems:any;

  ngOnInit(): void {
    console.log("menuItems", this.menuItems)
  }
}
