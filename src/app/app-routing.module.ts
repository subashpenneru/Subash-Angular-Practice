import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'orders', 
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
    { path: 'customers',
     loadChildren: function() {
         return import('./customers/customers.module').then(module => module.CustomersModule);
     } }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ]
})
export class ApproutingModule {}