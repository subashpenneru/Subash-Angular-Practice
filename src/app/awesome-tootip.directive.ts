import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";

import { AwesomeTooltipComponent } from "./awesome-tooltip/awesome-tooltip.component";

@Directive({
  selector: "[appAwesomeTootip]",
})
export class AwesomeTootipDirective implements OnInit {
  @Input("appAwesomeTootip") text = "";
  @Input("tooltipType") type: "default" | "custom" = "default";
  private overlayRef: OverlayRef;

  @HostListener("mouseenter") show() {
    const tooltipPortal = new ComponentPortal(AwesomeTooltipComponent);

    const tooltipRef: ComponentRef<AwesomeTooltipComponent> =
      this.overlayRef.attach(tooltipPortal);

    tooltipRef.instance.text = this.text;
    tooltipRef.instance.type = this.type;
  }

  @HostListener("mouseout") hide() {
    this.overlayRef.detach();
  }

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
          offsetY: -8,
        },
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }
}
