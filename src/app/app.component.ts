import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatAll, delay, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  btn = of(JSON.parse(localStorage.getItem('selectedVal')) || 0).pipe(
    delay(500)
  );

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

  setBtn(val: number) {
    localStorage.setItem('selectedVal', JSON.stringify(val));
    location.reload();
  }
}
