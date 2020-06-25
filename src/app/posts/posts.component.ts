import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Post[];
  public errorMessage: string;

  constructor(private postSer: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.errorMessage = '';
    this.posts = [];
    this.postSer.getPosts().subscribe(posts => {
      this.posts = [...posts];
    }, err => {
      console.log(err);
    });
  }

  getPost(postId: number) {
    this.errorMessage = '';
    this.posts = [];
    this.postSer.getSinglePost(postId).subscribe(post => {
      this.posts = [{id: post.id, post: post.post, author: post.author}];
    }, err => {
      this.errorMessage = err.message;
      console.log(err);
    });
  }
}
