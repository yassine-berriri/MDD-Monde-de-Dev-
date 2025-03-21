import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private pathService = '/api/post';

  constructor(private httpClient: HttpClient) {
  }

  
  public all(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.pathService);
  }

  public getBySubscribedTopics(userId: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.pathService}/user/${userId}`);
  }

  public create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.pathService}`, post);
  }

  public getPostById(id: string): Observable<Post>
  {
    return this.httpClient.get<Post>(`${this.pathService}/${id}`);
  }

  


    

  


}
