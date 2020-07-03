import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {AuthComponent} from './auth.component';

const authRoutes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule {

}
