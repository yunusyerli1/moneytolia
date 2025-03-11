import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-svg-image',
  imports: [AngularSvgIconModule],
  templateUrl: './svg-image.component.html',
  styleUrl: './svg-image.component.scss'
})
export class SvgImageComponent {
  @Input() width: string = '18px';
  @Input() height: string = '18px';
  @Input() iconName?: string = 'angle-double-right';
  @Input() color: string = '';
}
