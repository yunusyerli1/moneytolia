import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CampaignListComponent } from './views/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './views/campaign-create/campaign-create.component';

export const routes: Routes = [
  { path: "home", component: CampaignListComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "create", component: CampaignCreateComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];
