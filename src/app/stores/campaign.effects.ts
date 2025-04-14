// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';
// import * as CampaignActions from './campaign.actions';
// import { ICampaignModel } from '../helpers/models/ICampaignModel';

// @Injectable()
// export class CampaignEffects {
//   constructor(
//     private actions$: Actions
//   ) {}

//   // Load campaigns from localStorage
//   loadCampaigns$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CampaignActions.loadCampaigns),
//       mergeMap(() => {
//         try {
//           const storedData = localStorage.getItem("campaigns");
//           const campaigns = storedData ? JSON.parse(storedData) : [];
//           return of(CampaignActions.loadCampaignsSuccess({ campaigns }));
//         } catch (error) {
//           return of(CampaignActions.loadCampaignsFailure({ error }));
//         }
//       })
//     )
//   );

//   // Add campaigns and save to localStorage
//   addCampaigns$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CampaignActions.addCampaigns),
//       mergeMap(({ campaigns }) => {
//         try {
//           const currentData = localStorage.getItem("campaigns");
//           const currentCampaigns = currentData ? JSON.parse(currentData) : [];
//           const updatedCampaigns = [...currentCampaigns, ...campaigns];
//           localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
//           return of(CampaignActions.addCampaignsSuccess({ campaigns }));
//         } catch (error) {
//           return of(CampaignActions.addCampaignsFailure({ error }));
//         }
//       })
//     )
//   );

//   // Update campaign and save to localStorage
//   updateCampaign$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CampaignActions.updateCampaign),
//       mergeMap(({ campaign }) => {
//         try {
//           const currentData = localStorage.getItem("campaigns");
//           const currentCampaigns = currentData ? JSON.parse(currentData) : [];
//           const updatedCampaigns = currentCampaigns.map((item: ICampaignModel) => 
//             item.id === campaign.id ? campaign : item
//           );
//           localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
//           return of(CampaignActions.updateCampaignSuccess({ campaign }));
//         } catch (error) {
//           return of(CampaignActions.updateCampaignFailure({ error }));
//         }
//       })
//     )
//   );

//   // Delete campaign and save to localStorage
//   deleteCampaign$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CampaignActions.deleteCampaign),
//       mergeMap(({ id }) => {
//         try {
//           const currentData = localStorage.getItem("campaigns");
//           const currentCampaigns = currentData ? JSON.parse(currentData) : [];
//           const updatedCampaigns = currentCampaigns.filter((campaign: ICampaignModel) => campaign.id !== id);
//           localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
//           return of(CampaignActions.deleteCampaignSuccess({ id }));
//         } catch (error) {
//           return of(CampaignActions.deleteCampaignFailure({ error }));
//         }
//       })
//     )
//   );
// } 