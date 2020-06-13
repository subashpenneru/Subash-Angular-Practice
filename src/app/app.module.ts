import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './shared/auth.service';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servers', component: ServersComponent,
  canActivate: [AuthGuardService],
  canActivateChild: [AuthGuardService],
  children: [
    { path: ':id', component: ServerComponent }
  ]
},
]

@NgModule({
  declarations: [
    AppComponent,
    ServersComponent,
    ServerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
