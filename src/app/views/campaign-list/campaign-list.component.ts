import { Component } from '@angular/core';
import { CampaignStore } from '../../stores/campaign.store';

@Component({
  selector: 'app-campaign-list',
  imports: [],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent {
  
  constructor(
    private campaignStore: CampaignStore,
  ) { }

}
