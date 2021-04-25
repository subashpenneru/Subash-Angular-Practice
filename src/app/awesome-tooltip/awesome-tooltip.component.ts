import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-awesome-tooltip",
  templateUrl: "./awesome-tooltip.component.html",
  styleUrls: ["./awesome-tooltip.component.css"],
})
export class AwesomeTooltipComponent implements OnInit {
  @Input() text: any;
  @Input() type = "default";

  constructor() {}

  ngOnInit(): void {}
}
