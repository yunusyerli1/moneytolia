import { Component } from '@angular/core';
import { FormCreateCampaignComponent } from '../../components/form-create-campaign/form-create-campaign.component';
import { CampaignStore } from '../../stores/campaign.store';

@Component({
  selector: 'app-campaign-create',
  imports: [FormCreateCampaignComponent],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {

  constructor(private campaignStore: CampaignStore) {}

  submitForm(item: any) {
    this.campaignStore.addToState([item]);
  }
}
