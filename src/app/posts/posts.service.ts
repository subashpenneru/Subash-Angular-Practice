import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = 'api/posts';
  constructor(private http: HttpClient) { }

  getPosts() {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.get<Post[]>(this.url, { headers: headerOptions });
  }

  getSinglePost(id: number) {
    const headerOptions = new HttpHeaders(this.getHttpHeaderOptions());
    return this.http.get<Post>(this.url + '/' + id, { headers: headerOptions });
  }

  getHttpHeaderOptions() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}
