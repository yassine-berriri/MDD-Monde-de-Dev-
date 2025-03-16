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
import { MatIconModule } from '@angular/material/icon';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { TopicApiService } from './services/topic.service';
import { PostApiService } from './services/post.service';


const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
    

]

@NgModule({
  declarations: [
    TopicsComponent,
    PostsComponent,
    CreatePostComponent,
    
  ],
  exports: [
    TopicsComponent,
    TopicRoutingModule,
    CreatePostComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...materialModule
  ],

})
export class TopicsModule { }
