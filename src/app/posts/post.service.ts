import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public postInfo = new BehaviorSubject<{postId: number, userId: number}>({ 
    postId: -1, 
    userId: -1 
  });

  constructor(private http: HttpClient) { }

  getPosts() {
    const httpHeaders = new HttpHeaders(this.getHeaderOptions());
    return this.http.get(environment.apiUrl + 'posts', { headers: httpHeaders })
      .pipe(
        map((postData: any) => {
          if(postData.length > 10) {
            return postData.slice(0, 10);
          }
          return postData;
        }),
        catchError(error => this.handleError(error))
      )
  }

  getSinglePost(id) {
    return this.http.get(environment.apiUrl + `posts/${id}`);
  }

  getHeaderOptions() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  handleError(error: HttpErrorResponse) {
    const errorObj = { url: '', message: '' }
    let url = error.url.split('/');
    errorObj.url = url[url.length-1];

    if(error.error.message) {
      errorObj.message = error.error.message;
    } else {
      errorObj.message = error.message
    }

    return throwError(errorObj);
  }
}
