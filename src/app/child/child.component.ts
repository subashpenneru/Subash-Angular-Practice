import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() serverData: [];
  @ViewChildren('serverItem') serverItem: QueryList<ElementRef>;
  @ContentChildren('serverItemContent') serverItemContent;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    console.log('aftercontent', this.serverItemContent);
  }

  ngAfterViewInit() {
    // this.serverItem.forEach((ele) => {
    //   console.log(ele.nativeElement.textContent);
    // });
  }
}
