import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './posts/add-post/add-post.component';
import {EditPostComponent} from './posts/edit-post/edit-post.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'add-post', component: AddPostComponent },
  { path: 'edit-post', component: EditPostComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
