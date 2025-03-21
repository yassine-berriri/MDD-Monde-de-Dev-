import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './components/topics/topics.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DetailsPostComponent } from './components/details-post/details-post.component';

const routes: Routes = [
  { title: 'Topics', path: '', component: TopicsComponent },
  { title: 'Posts', path: 'topics/posts', component: PostsComponent },
  { title: 'Posts', path: 'addPost', component: CreatePostComponent },
  { title: "Post", path: 'details/:id', component: DetailsPostComponent }
];

@NgModule({
 imports: [
 //   CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class TopicRoutingModule { }
