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
  public singlePost = false;

  constructor(private postServ: PostsService) { }

  ngOnInit(): void {
    this.postServ.getPosts().subscribe(posts => {
      this.posts = [...posts];
    });
  }

  getpost(postId: number) {
    this.postServ.getSinglePost(postId).subscribe(post => {
      console.log(post);
    });
  }
}
