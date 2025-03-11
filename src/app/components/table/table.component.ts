import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { TruncatePipe } from '../../helpers/pipes/truncate.pipe';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';

@Component({
  selector: 'app-table',
  imports: [CommonModule, SvgImageComponent, TruncatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  @Input() titles: string[] = [];
  @Input() actionIcon: string = 'edit-line';

  list = input<ICampaignModel[]>();

  ngOnInit() {
   
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  openModal(item: ICampaignModel) {
   
  }

}
