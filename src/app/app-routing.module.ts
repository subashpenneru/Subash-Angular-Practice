import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LazyLoadGuard } from './lazy-load.guard';
import { SigninComponent } from './users/auth/signin/signin.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { 
        path: 'servers', 
        loadChildren: () => import('./servers/server.module').then(mod => mod.ServerModule),
        canLoad: [LazyLoadGuard]
    },
    { path: 'not-found', component: NotFoundComponent, data: { message: '404 Page not Found' } },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}