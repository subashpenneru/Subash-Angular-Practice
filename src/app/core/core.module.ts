import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AlertComponent } from './alert/alert.component'

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  exports: [AlertComponent],
  providers: [],
})
export class CoreModule {}
