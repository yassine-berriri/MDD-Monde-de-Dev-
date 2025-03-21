import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicApiService {

  private pathService = '/api/topic';

  constructor(private httpClient: HttpClient) {
  }

  
  public all(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.pathService);
  }

  public subscribe(topicId: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${topicId}/subscribe/${userId}`, null);
  }

  public unsubscribe(topicId: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${topicId}/unSubscribe/${userId}`, null);
  }

  public getSubscribedTopicsByUserId(id: string): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathService}/subscribed/${id}`);
  }


    

  


}
