import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { TruncatePipe } from '../../helpers/pipes/truncate.pipe';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { CampaignStore } from '../../stores/campaign.store';

@Component({
  selector: 'app-table',
  imports: [CommonModule, SvgImageComponent, TruncatePipe, MatDialogModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() titles: string[] = [];

  list = input<ICampaignModel[]>();

  constructor(
    private campaignStore: CampaignStore,
    private dialog: MatDialog
  ) {}

  trackByFn(index: number, item: any) {
    return item.id;
  }

  openModal(item: ICampaignModel) {
    this.dialog.open(ModalComponent, {
      width: '600px',
      data: item
    });
  }

  deleteRecord(item: ICampaignModel) {
    this.campaignStore.deleteCampaign(item.id)
  }

}
