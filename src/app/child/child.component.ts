import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  DoCheck,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnChanges, OnInit, DoCheck {
  // @Input() data: string[];
  @Input() data: Observable<any>;

  food: string[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {
    this.data.subscribe((fruit) => {
      this.food = [...this.food, ...fruit];
      this.cd.markForCheck();
    });
  }

  ngDoCheck() {
    console.log('[DOCHECK]');
  }

  onRefresh() {
    this.cd.detectChanges();
  }
}
