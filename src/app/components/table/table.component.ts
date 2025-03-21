import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ITableConfig } from '../../helpers/models/ITableConfig';

@Component({
  selector: 'app-table',
  imports: [CommonModule, SvgImageComponent, MatDialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() config!: ITableConfig;

  public trackByFn(index: number, item: any): string {
    return item.id;
  }

  triggerAction(action: any, record: any) {
    action.function(record);
  }

}