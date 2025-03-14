import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicApiService } from '../../services/topic.service';
import { SessionService } from 'src/app/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public topics$: Observable<Topic[]> | undefined;
  constructor(private topicService: TopicApiService, private sessionService: SessionService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.topics$ = this.topicService.all()
   
  }

  public isUserSubscribed(topic: Topic): boolean {
    return topic.users?.some(user => user === this.sessionService.sessionInformation?.id) ?? false;
  }

  public subscribe(topic: Topic): void {
    if (!topic.id || !this.sessionService.sessionInformation?.id) {
      this.matSnackBar.open("You must be logged in to subscribe to a topic", 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.isUserSubscribed(topic)) {
      this.topicService.unsubscribe(topic.id.toString(), this.sessionService.sessionInformation!.id.toString()).subscribe(_ => {
        this.topics$ = this.topicService.all()
        this.matSnackBar.open("You have successfully unsubscribed from the topic", 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
      })
    }
    else {
      this.topicService.subscribe(topic.id.toString(), this.sessionService.sessionInformation!.id.toString()).subscribe(_ => {
        this.topics$ = this.topicService.all()
        this.matSnackBar.open("You have successfully subscribed to the topic", 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
      })
    };
  }




}
