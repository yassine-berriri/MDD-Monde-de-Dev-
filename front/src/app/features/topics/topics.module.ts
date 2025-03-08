import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsComponent } from './components/topics/topics.component';
import { RouterModule, Routes } from '@angular/router';
import { TopicRoutingModule } from './topic-routing.module';



@NgModule({
  declarations: [
    TopicsComponent
  ],
  exports: [
    TopicsComponent,
    TopicRoutingModule
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    RouterModule
    
  ]
})
export class TopicsModule { }
