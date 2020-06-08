import { Component } from '@angular/core';
import { AppSubjectService } from './app-subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Practice';

  constructor(private appSub: AppSubjectService) {
    this.appSub.userSub.subscribe(res => console.log('[APP Subject]', res));
    this.appSub.userBehSub.subscribe(res => console.log('[APP Behav]', res));
    this.appSub.userReplaySub.subscribe(res => console.log('[APP Replay]', res));
    this.appSub.userAsyncSub.subscribe(res => console.log('[APP Async]', res));
  }

  onAddUser() {

    this.appSub.userSub.next({name: 'Server1', age: this.getAge()})
    this.appSub.userSub.next({name: 'Server2', age: this.getAge()})
    this.appSub.userSub.next({name: 'Server3', age: this.getAge()})

    this.appSub.userBehSub.next({name: 'Server1', age: this.getAge()})
    this.appSub.userBehSub.next({name: 'Server2', age: this.getAge()})
    this.appSub.userBehSub.next({name: 'Server3', age: this.getAge()})

    this.appSub.userReplaySub.next({name: 'Server1', age: this.getAge()})
    this.appSub.userReplaySub.next({name: 'Server2', age: this.getAge()})
    this.appSub.userReplaySub.next({name: 'Server3', age: this.getAge()})

    this.appSub.userAsyncSub.next({name: 'Server1', age: this.getAge()})
    this.appSub.userAsyncSub.next({name: 'Server2', age: this.getAge()})
    this.appSub.userAsyncSub.next({name: 'Server3', age: this.getAge()})
    this.appSub.userAsyncSub.complete();

    this.appSub.userSub.subscribe(res => console.log('[APP func Subject]', res))
    this.appSub.userBehSub.subscribe(res => console.log('[APP func Behav]', res))
    this.appSub.userReplaySub.subscribe(res => console.log('[APP func Replay]', res))
    this.appSub.userAsyncSub.subscribe(res => console.log('[APP func Async]', res))
  }

  getAge = () => {
    return Math.floor(Math.random() * 50);
  }
}
