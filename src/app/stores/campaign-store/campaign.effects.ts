import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as CampaignActions from './campaign.actions';

@Injectable()
export class CampaignEffects {
  private actions$ = inject(Actions);

  loadCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CampaignActions.loadCampaigns),
      switchMap(() => {
        try {
          const storedData = localStorage.getItem('campaigns');
          const campaigns = storedData ? JSON.parse(storedData) : [];
          return of(CampaignActions.loadCampaignsSuccess({ campaigns }));
        } catch (error) {
          return of(CampaignActions.loadCampaignsFailure({ error }));
        }
      })
    );
  });

  addCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CampaignActions.addCampaigns),
      switchMap(({ campaigns }) => {
        try {
          const storedData = localStorage.getItem('campaigns');
          const existingCampaigns = storedData ? JSON.parse(storedData) : [];
          const updatedCampaigns = [...existingCampaigns, ...campaigns];
          localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
          return of(CampaignActions.addCampaignsSuccess({ campaigns }));
        } catch (error) {
          return of(CampaignActions.addCampaignsFailure({ error }));
        }
      })
    );
  });

  updateCampaign$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CampaignActions.updateCampaign),
      switchMap(({ campaign }) => {
        try {
          const storedData = localStorage.getItem('campaigns');
          const existingCampaigns = storedData ? JSON.parse(storedData) : [];
          const updatedCampaigns = existingCampaigns.map((item: any) => 
            item.id === campaign.id ? campaign : item
          );
          localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
          return of(CampaignActions.updateCampaignSuccess({ campaign }));
        } catch (error) {
          return of(CampaignActions.updateCampaignFailure({ error }));
        }
      })
    );
  });

  deleteCampaign$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CampaignActions.deleteCampaign),
      switchMap(({ id }) => {
        try {
          const storedData = localStorage.getItem('campaigns');
          const existingCampaigns = storedData ? JSON.parse(storedData) : [];
          const updatedCampaigns = existingCampaigns.filter((campaign: any) => campaign.id !== id);
          localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
          return of(CampaignActions.deleteCampaignSuccess({ id }));
        } catch (error) {
          return of(CampaignActions.deleteCampaignFailure({ error }));
        }
      })
    );
  });
} 