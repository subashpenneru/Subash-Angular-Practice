import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppSubjectService } from "./app-subject.service";
import { ServerComponent } from "./server/server.component";

@NgModule({
  declarations: [AppComponent, ServerComponent],
  imports: [BrowserModule],
  providers: [AppSubjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
