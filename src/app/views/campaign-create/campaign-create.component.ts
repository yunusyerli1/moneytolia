import { Component } from '@angular/core';
import { FormCreateCampaignComponent } from '../../components/form-create-campaign/form-create-campaign.component';
import { CampaignStore } from '../../stores/campaign.store';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';

@Component({
  selector: 'app-campaign-create',
  imports: [FormCreateCampaignComponent],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {

  constructor(private campaignStore: CampaignStore) {}

  public submitForm(item: ICampaignModel): void {
    this.campaignStore.addToState([item]);
  }
}
