import { AppComponent } from './app.component';
import {
  HomeComponent,
  Page1Component,
  Page2Component,
  Page3Component,
} from './home';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent, SigninComponent } from './users';
import { AuthGuard } from './auth.guard';
import { AuthService, SidebarComponent, SidebarService } from './shared';

export const components = [
  AppComponent,
  HomeComponent,
  UsersComponent,
  NotFoundComponent,
  SigninComponent,
  Page1Component,
  Page2Component,
  Page3Component,
  SidebarComponent,
];

export const bootstrapCMP = [AppComponent];

export const services = [AuthService, AuthGuard, SidebarService];
