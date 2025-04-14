import { createAction, props } from '@ngrx/store';
import { ICampaignModel } from '../helpers/models/ICampaignModel';

// Load Campaigns
export const loadCampaigns = createAction('[Campaign] Load Campaigns');

// Add Campaigns
export const addCampaigns = createAction(
  '[Campaign] Add Campaigns',
  props<{ campaigns: ICampaignModel[] }>()
);

// Update Campaign
export const updateCampaign = createAction(
  '[Campaign] Update Campaign',
  props<{ campaign: ICampaignModel }>()
);

// Delete Campaign
export const deleteCampaign = createAction(
  '[Campaign] Delete Campaign',
  props<{ id: string }>()
);
