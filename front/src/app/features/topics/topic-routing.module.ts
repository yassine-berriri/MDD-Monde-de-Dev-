import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './components/topics/topics.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { title: 'Topics', path: '', component: TopicsComponent },
  { title: 'Posts', path: 'posts', component: PostsComponent }
];

@NgModule({
 imports: [
 //   CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class TopicRoutingModule { }
