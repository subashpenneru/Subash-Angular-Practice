import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FruitListComponent implements OnInit, OnChanges, DoCheck {
  @Input() fruitList: string[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges', changes);
  }

  ngOnInit(): void {}

  ngDoCheck() {
    console.log(['DoCheck']);
  }

  onRefresh() {
    this.cd.detectChanges();
  }
}
