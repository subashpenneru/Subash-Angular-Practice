import { Component, OnInit } from '@angular/core';
import { empty, from, generate, iif, of, range, throwError, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, startWith } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css'],
})
export class CreationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.clear();
    /**
     * ajax
     */
    ajax(environment.users)
      .pipe(
        map((userResponse) => console.log('users: ', userResponse)),
        catchError((error) => {
          console.log('error: ', error);
          return throwError(error);
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err.message);
        },
      });

    /**
     * defer
     */
    // defer(function () {
    //   return Math.random() > 0.5
    //     ? fromEvent(document, 'click')
    //     : interval(1000);
    // }).subscribe((x) => console.log(x));

    /**
     * empty
     */
    empty()
      .pipe(startWith(1, 2, 3))
      .subscribe((res) => console.log('EMPTY', res));
    // interval(1000)
    //   .pipe(mergeMap((x) => (x % 2 === 1 ? of('a', 'b', 'c') : empty())))
    //   .subscribe((res) => console.log('EMPTY', res));

    /**
     * from
     */
    from([1]).subscribe((res) => console.log('from', res));

    /**
     * fromEventPattern
     */
    // fromEventPattern(
    //   (handler) => document.addEventListener('click', handler),
    //   (handler) => document.removeEventListener('click', handler)
    // ).subscribe((x) => console.log(x));

    /**
     * generate
     */
    generate(
      0,
      (x) => x < 3,
      (x) => x + 1
    ).subscribe((res) => console.log('GENERATE', res));

    /**
     * range
     */
    range(0, 3).subscribe((res) => console.log('RANGE', res));

    /**
     * timer
     */
    timer(3000).subscribe((res) => console.log('TIMER', res));

    /**
     * iif
     */
    iif(() => false, of('first'), of('second')).subscribe((res) =>
      console.log('iif', res)
    );
  }
}
