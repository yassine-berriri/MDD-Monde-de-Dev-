import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public updateUser(id: string, user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.pathService}/${id}`, user);
  }

  


    

  


}
