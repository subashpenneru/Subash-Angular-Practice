import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostsService} from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @ViewChild('postMessage') message: ElementRef;
  @ViewChild('author') author: ElementRef;

  constructor(private postSer: PostsService, private router: Router) { }

  ngOnInit(): void {
  }

  savePost() {
    const postMessage = this.message.nativeElement.value;
    const postAuthor = this.author.nativeElement.value;

    this.postSer.getLastPostId().subscribe(posts => {
      const resPosts = [...posts];
      const postId = resPosts.length;
      const obj = { id: postId + 1, post: postMessage, author: postAuthor };
      this.postSer.postPost(obj).subscribe(res => {
        this.resetPost();
        this.router.navigate(['/posts']);
      }, err => console.log(err));
    });
  }

  resetPost() {
    this.message.nativeElement.value = '';
    this.author.nativeElement.value = '';
  }
}
