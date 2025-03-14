import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostApiService } from '../../services/post.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostApiService, private sessionService: SessionService) { }

    public posts$: Observable<Post[]> | undefined;

  ngOnInit(): void {

    this.posts$ = this.postService.getBySubscribedTopics(this.sessionService.sessionInformation?.id.toString() ?? '');
  }

}
