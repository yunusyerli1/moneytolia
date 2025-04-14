import { Component } from '@angular/core';
import { FormCreateCampaignComponent } from '../../components/form-create-campaign/form-create-campaign.component';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';
import { Store } from '@ngrx/store';
import * as CampaignActions from '../../stores/campaign-store/campaign.actions';

@Component({
  selector: 'app-campaign-create',
  imports: [FormCreateCampaignComponent],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {

  constructor(private store: Store) {}

  public submitForm(item: ICampaignModel): void {
    this.store.dispatch(CampaignActions.addCampaigns({ campaigns: [item] }));
  }
}
