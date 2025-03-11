import { CommonModule } from '@angular/common';
import { Component, input, Input, signal, WritableSignal } from '@angular/core';
import { SvgImageComponent } from '../svg-image/svg-image.component';
import { TruncatePipe } from '../../helpers/pipes/truncate.pipe';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { CampaignStore } from '../../stores/campaign.store';

@Component({
  selector: 'app-table',
  imports: [CommonModule, SvgImageComponent, TruncatePipe, MatDialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() titles: string[] = [];

  list = input<ICampaignModel[]>();

  constructor(
    private campaignStore: CampaignStore,
    private dialog: MatDialog
  ) { }

  public openModal(item: ICampaignModel): void {
    this.dialog.open(ModalComponent, {
      width: '600px',
      data: item
    });
  }

  public deleteRecord(item: ICampaignModel): void {
    this.campaignStore.deleteCampaign(item.id)
  }

  public increasePoints(item: ICampaignModel): void {
    const newItem = {
      ...item,
      points: item.points + 1
    }
    this.campaignStore.updateCampaign(newItem)
  }

  public decreasePoints(item: ICampaignModel): void {
    const newItem = {
      ...item,
      points: item.points - 1
    }
    this.campaignStore.updateCampaign(newItem)
  }

  public trackByFn(index: number, item: any): string {
    return item.id;
  }

}
