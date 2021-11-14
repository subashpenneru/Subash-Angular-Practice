import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from "rxjs";

@Injectable()
export class AppSubjectService {
  userSub = new Subject<{ name: string; age: number }>();
  userBehSub = new BehaviorSubject({ name: "Service Behav", age: 25 });
  userReplaySub = new ReplaySubject(2);
  userAsyncSub = new AsyncSubject<{ name: string; age: number }>();
}
