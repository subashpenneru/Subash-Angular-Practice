import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CreationComponent } from './creation/creation.component';
import { JoinCreationComponent } from './join-creation/join-creation.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component'

@NgModule({
  declarations: [AppComponent, CreationComponent, JoinCreationComponent, ErrorHandleComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
