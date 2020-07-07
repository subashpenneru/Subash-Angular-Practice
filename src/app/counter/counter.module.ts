import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';

import {CounterComponent} from './counter.component';
import {CounterActionsComponent} from './counter-actions/counter-actions.component';
import {AuthGuard} from '../auth/auth.guard';
import {counterReducer} from './store/counter.reducer';

const routes: Routes = [
  { path: '', component: CounterComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [CounterComponent, CounterActionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('counter', counterReducer)
  ]
})
export class CounterModule { }
