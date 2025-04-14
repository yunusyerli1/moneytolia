import { createReducer, on } from '@ngrx/store';
import { ICampaignModel } from '../../helpers/models/ICampaignModel';
import * as CampaignActions from './campaign.actions';

export interface CampaignState {
  campaigns: ICampaignModel[];
  loading: boolean;
  error: any;
}

export const initialState: CampaignState = {
  campaigns: [],
  loading: false,
  error: null
};

export const campaignReducer = createReducer(
  initialState,
  
  // Load Campaigns
  on(CampaignActions.loadCampaigns, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CampaignActions.loadCampaignsSuccess, (state, { campaigns }) => ({
    ...state,
    campaigns,
    loading: false,
    error: null
  })),
  on(CampaignActions.loadCampaignsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Campaigns
  on(CampaignActions.addCampaigns, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CampaignActions.addCampaignsSuccess, (state, { campaigns }) => ({
    ...state,
    campaigns: [...state.campaigns, ...campaigns],
    loading: false,
    error: null
  })),
  on(CampaignActions.addCampaignsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Campaign
  on(CampaignActions.updateCampaign, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CampaignActions.updateCampaignSuccess, (state, { campaign }) => ({
    ...state,
    campaigns: state.campaigns.map((item: ICampaignModel) => 
      item.id === campaign.id ? campaign : item
    ),
    loading: false,
    error: null
  })),
  on(CampaignActions.updateCampaignFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Campaign
  on(CampaignActions.deleteCampaign, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CampaignActions.deleteCampaignSuccess, (state, { id }) => ({
    ...state,
    campaigns: state.campaigns.filter((campaign: ICampaignModel) => campaign.id !== id),
    loading: false,
    error: null
  })),
  on(CampaignActions.deleteCampaignFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);