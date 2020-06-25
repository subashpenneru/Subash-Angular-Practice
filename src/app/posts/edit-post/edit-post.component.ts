import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postMessage = '';
  postAuthor = '';
  editPostId = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private postSer: PostsService) {
    this.route.queryParams.subscribe((params: {postId: string}) => {
      this.editPostId = +params.postId;
      this.postSer.getSinglePost(this.editPostId).subscribe((post: Post) => {
        this.postMessage = post.post;
        this.postAuthor = post.author;
      });
    });
  }

  ngOnInit(): void {
  }

  onEditPost() {
    const postObj = { id: this.editPostId, post: this.postMessage, author: this.postAuthor };
    this.postSer.updatePost(postObj).subscribe(res => {
      this.router.navigate(['/posts']);
    });
  }
}
