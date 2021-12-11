import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  defer,
  empty,
  from,
  fromEvent,
  fromEventPattern,
  generate,
  iif,
  interval,
  of,
  range,
  throwError,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  concatAll,
  concatMapTo,
  exhaust,
  first,
  map,
  mergeAll,
  mergeMap,
  startWith,
  switchAll,
} from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  btn = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    of(1, 2, 3)
      .pipe(
        map((val) => val * val),
        // first(),
        map((res) => this.http.get(environment.users + '/' + res)),
        concatAll()
        // mergeAll()
        // switchAll()
        // exhaust()
      )
      .subscribe((res) => {
        console.log('Value: -', res);
      });
  }
}
