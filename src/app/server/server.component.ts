import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ContentChild,
} from "@angular/core";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  @Input("server") server: { name: string; status: string };
  @ViewChild("serverPara") serverPara: ElementRef;
  @ContentChild("serverContent") serverContent: ElementRef;

  constructor() {
    console.log("[CONSTRUCTOR]");
  }

  ngOnChanges() {
    console.log("[OnChanges]", this.server);
  }

  ngOnInit(): void {
    console.log("[OnInit]");
  }

  ngDoCheck() {
    console.log("[DoCheck]", this.server);
  }

  ngAfterContentInit() {
    console.log("[AfterContentInit]", this.serverContent.nativeElement);
  }

  ngAfterContentChecked() {
    console.log("[AfterContentChecked]", this.serverContent.nativeElement);
  }

  ngAfterViewInit() {
    console.log("[AfterViewInit]", this.serverPara.nativeElement);
  }

  ngAfterViewChecked() {
    console.log("[AfterViewChecked]", this.serverPara.nativeElement);
  }

  ngOnDestroy() {
    console.log("[OnDestroy]");
  }
}
