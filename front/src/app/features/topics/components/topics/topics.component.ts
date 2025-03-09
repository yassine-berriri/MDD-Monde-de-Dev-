import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicApiService } from '../../services/topic.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public topics$: Observable<Topic[]> = this.topicService.all();
  constructor(private topicService: TopicApiService) { }

  ngOnInit(): void {

  }

}
