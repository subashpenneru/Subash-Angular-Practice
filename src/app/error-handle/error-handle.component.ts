import { Component, OnInit } from '@angular/core';
import { interval, of, throwError, timer } from 'rxjs';
import {
  delayWhen,
  map,
  mergeMap,
  retry,
  retryWhen,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-error-handle',
  templateUrl: './error-handle.component.html',
  styleUrls: ['./error-handle.component.css'],
})
export class ErrorHandleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.clear();

    /**
     * retry
     */
    interval(1000)
      .pipe(
        mergeMap((val) => {
          if (val > 1) {
            return throwError('Error!');
          }
          return of(val);
        }),
        //retry 2 times on error
        retry(2)
      )
      .subscribe({
        next: (val) => console.log('SUCCESS', val),
        error: (val) => console.log(`${val}: Retried 2 times then quit!`),
      });

    /**
     * retryWhen
     */
    // interval(1000)
    //   .pipe(
    //     map((val) => {
    //       if (val > 1) {
    //         throw val;
    //       }
    //       return val;
    //     }),
    //     retryWhen((errors) =>
    //       errors.pipe(
    //         tap((val) => console.log(`Value ${val} was too high!`)),
    //         delayWhen((val) => timer(val * 1000))
    //       )
    //     )
    //   )
    //   .subscribe((res) => console.log('retryWhen', res));
  }
}
