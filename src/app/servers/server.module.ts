import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServerRoutingModule } from './server-routing.module';

import { ServersComponent } from './servers.component';
import { ServerComponent } from './server/server.component';
import { EditServerComponent } from './edit-server/edit-server.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

@NgModule({
  declarations: [ServersComponent, ServerComponent, EditServerComponent],
  imports: [CommonModule, FormsModule, ServerRoutingModule],
  exports: [],
  providers: [CanDeactivateGuard],
})
export class ServerModule {}
