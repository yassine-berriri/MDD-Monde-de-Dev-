import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicApiService } from '../../services/topic.service';
import { Post } from '../../interfaces/post.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostApiService } from '../../services/post.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  providers: [FormBuilder]
})
export class CreatePostComponent implements OnInit {
  public topics$ = this.topicService.all()
     
   public form = this.fb.group({
      topic: [
        '',
        [
          Validators.required,
        ]
      ],
  
      title: [
        '',
        [
          Validators.required,
          Validators.min(3),
          Validators.max(40)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.min(3),
        ]
      ]
    });
    
  

  constructor(private sessionService: SessionService, private postService: PostApiService, private fb: FormBuilder ,  private router: Router, private topicService: TopicApiService, private matSnackBar: MatSnackBar ) { }

  ngOnInit(): void {


  }

  create() {
    const post = this.form.value as Post;

    post.user_id = this.sessionService.sessionInformation?.id ?? 0;
    post.topic_id = Number(post.topic);



    this.postService.create(post).subscribe({
      next: () => this.exitPage('Post created successfully'),
      error: () => this.exitPage('Error creating post'),
    });

  }

  private exitPage(message: string): void {
    this.matSnackBar.open(message, 'Close', { duration: 3000 });
    this.router.navigate(['topics/posts']);
  }

  handleLandingPage() {
    this.router.navigate(['topics/posts']);  }
}
