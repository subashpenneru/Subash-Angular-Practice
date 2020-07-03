import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnChanges, OnInit, DoCheck {

  @Input() data: string[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log('[DOCHECK]', this.data);
  }

}
