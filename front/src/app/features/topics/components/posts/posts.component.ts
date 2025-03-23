import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostApiService } from '../../services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
   posts: Post[] = []; 
   posts$: Observable<Post[]> | undefined;
  sortOrder: 'asc' | 'desc' = 'asc';
  constructor(private postService: PostApiService, private sessionService: SessionService, private router: Router) { }
 

  ngOnInit(): void {

     this.postService.getBySubscribedTopics(this.sessionService.sessionInformation?.id.toString() ?? '').subscribe(posts => {
      this.posts = posts;
      this.sortPosts();
    });
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortPosts();
  }

  addPost(): void {
      this.router.navigate(['topics/addPost']);
  }

  sortPosts(): void {
    /*
    this.posts = this.posts.sort((a, b) =>
      this.sortOrder === 'asc'
        ? a.title.localeCompare(b.title) // Trier par date croissante
        : b.title.localeCompare(a.title) // Trier par date décroissante
    );

    this.posts$ = new Observable(observer => {
      observer.next(this.posts);
      observer.complete();
    });
    */
   if (this.sortOrder === 'asc'){
    this.posts$ = this.postService.getSortedPost("true");
   }
   else {
    this.posts$ = this.postService.getSortedPost("false");
   }
  }
 

}
