import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';
import { Post } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private pathService = '/api/comment';

  constructor(private httpClient: HttpClient) {
  }

  

  public create(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.pathService}`, comment);
  }

  public getCommentsByPostId(id: string): Observable<Comment[]>
  {
    return this.httpClient.get<Comment[]>(`${this.pathService}/${id}`);
  }

  


    

  


}
