import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];
