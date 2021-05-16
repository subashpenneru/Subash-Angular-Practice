import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";

@Directive({
  selector: "[customIf]",
})
export class CustomIfDirective {
  constructor(
    private te: TemplateRef<any>,
    private viewRef: ViewContainerRef
  ) {}

  @Input() set customIf(value: boolean) {
    console.log(value);
    if (value) {
      this.viewRef.createEmbeddedView(this.te);
    } else {
      this.viewRef.clear();
    }
  }
}
