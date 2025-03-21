import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostApiService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentApiService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';
import { UserApiService } from '../../services/user.service';
import { forkJoin } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import {  Validators, ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { SessionInformation } from 'src/app/interfaces/SessionInformation.interface';
import { SessionService } from 'src/app/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss'],
  providers: [FormBuilder]

})
export class DetailsPostComponent implements OnInit {


  public post: Post | undefined;
  public comments: Comment[] | undefined;
  public postId: string;
  public newComment: string | undefined;




  constructor(private postApiService: PostApiService,
     private router: Router, 
     private route: ActivatedRoute,
     private commentApiService: CommentApiService,
     private userApiService: UserApiService,
     private fb: FormBuilder,
     private sessionService: SessionService,
     private matSnackBar: MatSnackBar
  ) {
    this.postId = this.route.snapshot.paramMap.get('id')!;
   }

   public form = this.fb.group({
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ]
    ]
  });

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(): void {
    this.postApiService.getPostById(this.postId).subscribe((post: Post) => {
      this.post = post;
      console.log("post = ", this.post);

      if (post.id) {
        this.commentApiService.getCommentsByPostId(post.id.toString()).subscribe(comments => {
          console.log("comments = ", comments);

          if (comments.length > 0) {
            const userIds = [...new Set(comments.map(comment => comment.user_id))];

            const userRequests = userIds.map(userId => this.userApiService.getUserById(userId.toString()));

            forkJoin(userRequests).subscribe((users: User[]) => {
              console.log("users = ", users);

              const userMap = new Map(users.map(user => [user.id, user.name]));

              this.comments = comments.map(comment => ({
                ...comment,
                username: userMap.get(comment.user_id) || 'Utilisateur inconnu'
              })).reverse();

              console.log("comments with usernames = ", this.comments);
            });
          } else {
            this.comments = [];
          }
        });
      }
    });
  }

  public back() {
    window.history.back();
  }

  submitComment() {
    const comment = this.form.value as Comment;
    comment.post_id = this.post?.id ?? 0;
    comment.user_id = this.sessionService.sessionInformation?.id ?? 0;
    comment.username =  this.sessionService.sessionInformation?.username ?? "";

    this.commentApiService.create(comment).subscribe({
      next: () => {
        this.matSnackBar.open('Comment Added', 'Close', { duration: 3000 });
        this.fetchPost();
      },
      error: (err) => {
        console.error('Failed to create comment', err);
        this.matSnackBar.open('Failed to add comment', 'Close', { duration: 3000 });
      }

    })


  }

}
