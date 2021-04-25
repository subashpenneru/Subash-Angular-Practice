import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";

import { AppComponent } from "./app.component";
import { AwesomeTootipDirective } from "./awesome-tootip.directive";
import { AwesomeTooltipComponent } from "./awesome-tooltip/awesome-tooltip.component";

@NgModule({
  declarations: [AppComponent, AwesomeTootipDirective, AwesomeTooltipComponent],
  imports: [BrowserModule, OverlayModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
