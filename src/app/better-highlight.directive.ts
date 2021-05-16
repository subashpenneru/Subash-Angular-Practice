import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostBinding,
  HostListener,
  Input,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  @Input("defaultColor") default: any;
  @Input("highlightColor") highlight: any;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostBinding("style") style = { backgroundColor: "blue", color: "white" };

  ngOnInit() {
    this.render.setStyle(this.el.nativeElement, "background-color", "blue");
  }

  @HostListener("mouseenter") mouseover(event) {
    this.style = { backgroundColor: this.default, color: this.highlight };
  }

  @HostListener("mouseleave") mouseleave(event) {
    this.style = { backgroundColor: "blue", color: "white" };
  }
}
