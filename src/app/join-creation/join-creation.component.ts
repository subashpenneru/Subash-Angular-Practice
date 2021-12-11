import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  concat,
  forkJoin,
  fromEvent,
  interval,
  merge,
  of,
  partition,
  race,
  range,
  timer,
  zip,
} from 'rxjs';
import { delay, map, mapTo, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-join-creation',
  templateUrl: './join-creation.component.html',
  styleUrls: ['./join-creation.component.css'],
})
export class JoinCreationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.clear();

    /**
     * combineLatest
     */
    combineLatest(
      [1, 5, 10].map((n) => of(n).pipe(delay(n * 1000), startWith(0)))
    ).subscribe((res) => console.log('combineLatest', res));

    /**
     * concat
     */
    concat(interval(1000).pipe(take(4)), range(5, 4)).subscribe((res) =>
      console.log('concat', res)
    );

    /**
     * forkJoin
     */
    forkJoin([of(1, 2, 3, 4), Promise.resolve(8), timer(4000)]).subscribe(
      (res) => console.log('forkJoin', res)
    );

    /**
     * merge
     */
    merge(fromEvent(document, 'click'), interval(1000).pipe(take(4))).subscribe(
      (res) => console.log('merge', res)
    );

    /**
     * partition
     */
    const [even$, odd$] = partition(
      of(1, 2, 3, 4, 5, 6),
      (val, i) => val % 2 === 0
    );
    odd$.subscribe((res) => console.log('partition odd', res));
    even$.subscribe((res) => console.log('partition even', res));

    /**
     * race
     */
    // const obs1 = interval(1000).pipe(mapTo('fast one'));
    // const obs2 = interval(3000).pipe(mapTo('medium one'));
    // const obs3 = interval(5000).pipe(mapTo('slow one'));

    // race(obs3, obs1, obs2).subscribe((res) => console.log('race', res));

    /**
     * zip
     */
    zip(of(27, 25, 29), of('Foo', 'Bar', 'Beer'), of(true, true, false))
      .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
      .subscribe((res) => console.log('zip', res));
  }
}
