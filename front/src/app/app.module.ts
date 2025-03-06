import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicComponent } from './topic/topic.component';
import { PostComponent } from './features/post/post.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const materialModule = [
  
]

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
