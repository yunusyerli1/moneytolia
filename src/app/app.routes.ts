import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { LoggedInGuard } from './helpers/guards/logged-in.guard';
import { LogoutGuard } from './helpers/guards/logout.guard';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./views/home/home.component').then((m) => m.HomeComponent),
    children: [
      { path: "", loadComponent: () => import('./containers/campaign-list/campaign-list.component').then((m) => m.CampaignListComponent) },
      { path: "create", loadComponent: () => import('./containers/campaign-create/campaign-create.component').then((m) => m.CampaignCreateComponent) },
    ],
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "", pathMatch: "full" },
  { 
    path: "login", 
    loadComponent: () => import('./views/login/login.component').then((m) => m.LoginComponent),
    canActivate: [LoggedInGuard] 
  },
  { 
    path: "logout", 
    loadComponent: () => import('./views/login/login.component').then((m) => m.LoginComponent),
    canActivate: [LogoutGuard] },
  { 
    path: "404", 
    loadComponent: () => import('./views/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: "**", component: NotFoundComponent },
];
