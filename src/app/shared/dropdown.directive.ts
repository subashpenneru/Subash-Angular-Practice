import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  constructor() {}

  @HostListener("mouseenter") mouseover(e) {
    this.isOpen = true;
  }

  @HostListener("mouseleave") mouseleave(e) {
    this.isOpen = false;
  }
}
