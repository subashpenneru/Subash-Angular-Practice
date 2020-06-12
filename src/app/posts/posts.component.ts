import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsData: any;
  singlePost: any;
  isClicked = false;

  constructor(private postServ: PostService) { }

  ngOnInit(): void {
    this.postServ.getPosts().subscribe((res: any) => {
      this.postsData = res.slice(0, 10);
    }, error => {
      console.log(error);
    })
  }


  onSelectedSinglePost(post) {
    const postInfoObj = this.postServ.postInfo.getValue();

    if (postInfoObj.postId !== post.id) {
      this.isClicked = true;
      this.postServ.postInfo.next({ postId: post.id, userId: post.userId });
      this.postServ.getSinglePost(post.id).subscribe((res: any) => {
        this.singlePost = {
          title: res.title,
          userId: res.userId,
          body: res.body
        }
        this.isClicked = false;
      }, error => console.log(error))
    }
  }
}
