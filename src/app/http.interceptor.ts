import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { PostService } from "./posts/post.service";
import { Injectable } from "@angular/core";
import { map, tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private postServ: PostService) {}

  endPointUrl(url) {
    let reqUrl = url.split(environment.apiUrl);
    return reqUrl[reqUrl.length - 1];
  }

  intercept(
    req: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const endPoint = this.endPointUrl(req.url);

    if (endPoint !== "posts") {
      req = req.clone({
        headers: new HttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/json",
          userId: `${this.postServ.postInfo.getValue().userId}`,
        }),
      });
    }

    return httpHandler.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200 || event.status === 201) {
            console.log(event.url, "SUCCESSFULL");
          }
        }
      }),
      map((event) => {
        if (event instanceof HttpResponse) {
          const endPoint = this.endPointUrl(event.url);
          if (event.status === 200 && endPoint === "posts") {
            event.body.forEach((e) => (e.author = "Sai Subash Penneru"));
          }
          return event;
        }
      }),
      catchError((event) => {
        if (event instanceof HttpErrorResponse) {
          const endPoint = this.endPointUrl(event.url);
          console.log(endPoint);
          if (endPoint !== "posts") {
            return this.postServ.handleError(event);
          }
        }
      })
    );
  }
}
