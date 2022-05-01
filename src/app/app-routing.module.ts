import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent, SigninComponent } from './users';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { LazyLoadGuard } from './lazy-load.guard';
import {
  HomeComponent,
  Page1Component,
  Page2Component,
  Page3Component,
} from './home';
import { SidebarComponent } from './shared';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'page1',
        component: Page1Component,
        outlet: 'page1-route',
      },
      {
        path: 'page2',
        component: Page2Component,
        outlet: 'page1-route',
      },
      {
        path: 'page3',
        component: Page3Component,
        outlet: 'page1-route',
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  {
    path: 'servers',
    loadChildren: () =>
      import('./servers/server.module').then((mod) => mod.ServerModule),
    canLoad: [LazyLoadGuard],
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
    outlet: 'sidebarRoute',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { message: '404 Page not Found' },
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
