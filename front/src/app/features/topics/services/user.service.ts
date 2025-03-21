import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';
import { Post } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private pathService = '/api/user';

  constructor(private httpClient: HttpClient) {
  }

  

  public getUserById(id: string): Observable<User>
  {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  


    

  


}
