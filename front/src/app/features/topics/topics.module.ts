import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsComponent } from './components/topics/topics.component';
import { RouterModule, Routes } from '@angular/router';
import { TopicRoutingModule } from './topic-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostsComponent } from './components/posts/posts.component';

const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    TopicsComponent,
    PostsComponent
  ],
  exports: [
    TopicsComponent,
    TopicRoutingModule
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    HttpClientModule,
    ...materialModule
    
  ]
})
export class TopicsModule { }
