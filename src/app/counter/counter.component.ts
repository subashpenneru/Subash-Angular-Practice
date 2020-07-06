import {Component, OnInit} from '@angular/core';
import {CounterService} from './counter.service';
import {Counter} from './counter.model';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counterValue = 0;
  savedValues: Counter[] = [];

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.counterService.counter.subscribe(val => this.counterValue = val);
    this.counterService.counterValuesChanged.subscribe(values => this.savedValues = values);
  }

  onDelete(id: number) {
    this.counterService.deleteCounterValue(id);
  }
}
