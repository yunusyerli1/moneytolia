import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormCreateCampaignComponent } from '../form-create-campaign/form-create-campaign.component';
import { Store } from '@ngrx/store';
import * as CampaignActions from '../../stores/campaign-store/campaign.actions';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatButtonModule, FormCreateCampaignComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  public closeModal(): void {
    this.dialogRef.close();
  }

  public submitForm(item: any): void {
    this.store.dispatch((CampaignActions.updateCampaign({ campaign: item })));
    this.dialogRef.close();
  }

}
