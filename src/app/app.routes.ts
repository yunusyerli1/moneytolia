import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CampaignListComponent } from './views/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './views/campaign-create/campaign-create.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LogoutGuard } from './guards/logout.guard';

export const routes: Routes = [
  {
    path: "", component: HomeComponent,
    children: [
      { path: "", component: CampaignListComponent },
      { path: "create", component: CampaignCreateComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: "logout", component: LoginComponent, canActivate: [LogoutGuard] },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];
