import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Post } from './post.model';
import {BehaviorSubject, throwError} from 'rxjs/index';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = 'api/posts';
  isPostDeleted = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  getPosts() {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.get<Post[]>(this.url, { headers: headerOptions })
      .pipe(
        map(res => res)
      );
  }

  getSinglePost(id: number) {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.get<Post>(this.url + '/' + id, { headers: headerOptions })
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      );
  }

  getLastPostId() {
    return this.getPosts();
  }

  postPost(postData: Post) {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.post(this.url, postData, { headers: headerOptions });
  }

  updatePost(postData: Post) {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.put<any>(this.url + '/' + postData.id, postData, { headers: headerOptions });
  }

  deletePost(id: number) {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.delete(this.url + '/' + id, { headers: headerOptions });
  }

  getHttpHeaderOptions() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  handleError(error: HttpErrorResponse) {
    const url = error.url.split('/');
    const errObj = {
      message: `post with id=${url[url.length - 1]} not found`,
      url: error.url
    };
    return throwError(errObj);
  }
}
