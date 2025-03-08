import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicApiService } from '../../services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public topics$: Observable<Topic[]> | undefined;
  constructor(private topicService: TopicApiService) { }

  ngOnInit(): void {
    this.topics$ = this.topicService.all();
  }

}
