import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampaignState } from './campaign.reducer';

// Get the feature state
export const selectCampaignState = createFeatureSelector<CampaignState>('campaign');

// Get all campaigns
export const selectAllCampaigns = createSelector(
  selectCampaignState,
  (state: CampaignState) => state.campaigns
);

// Get loading state
export const selectLoading = createSelector(
  selectCampaignState,
  (state: CampaignState) => state.loading
);

// Get error state
export const selectError = createSelector(
  selectCampaignState,
  (state: CampaignState) => state.error
);

// Get campaign by ID
export const selectCampaignById = (id: string) => createSelector(
  selectAllCampaigns,
  (campaigns) => campaigns.find(campaign => campaign.id === id)
);

// Get campaigns count
export const selectCampaignsCount = createSelector(
  selectAllCampaigns,
  (campaigns) => campaigns.length
);

