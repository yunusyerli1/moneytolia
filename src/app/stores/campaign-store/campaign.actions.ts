import { createAction, props } from '@ngrx/store';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';

// Load Campaigns
export const loadCampaigns = createAction('[Campaign] Load Campaigns');
export const loadCampaignsSuccess = createAction(
  '[Campaign] Load Campaigns Success',
  props<{ campaigns: ICampaignModel[] }>()
);
export const loadCampaignsFailure = createAction(
  '[Campaign] Load Campaigns Failure',
  props<{ error: any }>()
);

// Add Campaigns
export const addCampaigns = createAction(
  '[Campaign] Add Campaigns',
  props<{ campaigns: ICampaignModel[] }>()
);
export const addCampaignsSuccess = createAction(
  '[Campaign] Add Campaigns Success',
  props<{ campaigns: ICampaignModel[] }>()
);
export const addCampaignsFailure = createAction(
  '[Campaign] Add Campaigns Failure',
  props<{ error: any }>()
);

// Update Campaign
export const updateCampaign = createAction(
  '[Campaign] Update Campaign',
  props<{ campaign: ICampaignModel }>()
);
export const updateCampaignSuccess = createAction(
  '[Campaign] Update Campaign Success',
  props<{ campaign: ICampaignModel }>()
);
export const updateCampaignFailure = createAction(
  '[Campaign] Update Campaign Failure',
  props<{ error: any }>()
);

// Delete Campaign
export const deleteCampaign = createAction(
  '[Campaign] Delete Campaign',
  props<{ id: string }>()
);
export const deleteCampaignSuccess = createAction(
  '[Campaign] Delete Campaign Success',
  props<{ id: string }>()
);
export const deleteCampaignFailure = createAction(
  '[Campaign] Delete Campaign Failure',
  props<{ error: any }>()
);
