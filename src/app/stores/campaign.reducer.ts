import { createReducer, on } from '@ngrx/store';
import { ICampaignModel } from '../helpers/models/ICampaignModel';
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
  on(CampaignActions.loadCampaigns, (state) => {
    try {
      const storedData = localStorage.getItem("campaigns");
      const campaigns = storedData ? JSON.parse(storedData) : [];
      return {
        ...state,
        campaigns,
        loading: false,
        error: null
      };
    } catch (error) {
      return {
        ...state,
        loading: false,
        error
      };
    }
  }),

  // Add Campaigns
  on(CampaignActions.addCampaigns, (state, { campaigns }) => {
    try {
      // Merge new campaigns with existing state
      const updatedCampaigns = [...state.campaigns, ...campaigns];
      // Update localStorage with the merged campaigns
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
      return {
        ...state,
        campaigns: updatedCampaigns,
        loading: false,
        error: null
      };
    } catch (error) {
      return {
        ...state,
        loading: false,
        error
      };
    }
  }),

  // Update Campaign
  on(CampaignActions.updateCampaign, (state, { campaign }) => {
    try {
      const updatedCampaigns = state.campaigns.map((item: ICampaignModel) => 
        item.id === campaign.id ? campaign : item
      );
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
      return {
        ...state,
        campaigns: updatedCampaigns,
        loading: false,
        error: null
      };
    } catch (error) {
      return {
        ...state,
        loading: false,
        error
      };
    }
  }),

  // Delete Campaign
  on(CampaignActions.deleteCampaign, (state, { id }) => {
    try {
      const updatedCampaigns = state.campaigns.filter((campaign: ICampaignModel) => campaign.id !== id);
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
      return {
        ...state,
        campaigns: updatedCampaigns,
        loading: false,
        error: null
      };
    } catch (error) {
      return {
        ...state,
        loading: false,
        error
      };
    }
  })
);