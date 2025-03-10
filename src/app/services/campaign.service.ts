import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { ICampaignModel } from '../helpers/models/ICampaignModel';
import { CampaignStore } from '../stores/campaign.store';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private campaignStore: CampaignStore) { }

  public getCampaigns(): ICampaignModel[] {
    return this.campaignStore.state;
  }

  public saveCampaign(campaign: ICampaignModel) {
    this.campaignStore.addToState([campaign]);
  }
}
