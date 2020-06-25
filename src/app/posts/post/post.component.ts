import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postData: Post ;
  constructor(private postSer: PostsService) { }

  ngOnInit(): void {
  }

  onDeletePost(id) {
    this.postSer.deletePost(id).subscribe(res => {
      this.postSer.isPostDeleted.next(true);
    });
  }
}
