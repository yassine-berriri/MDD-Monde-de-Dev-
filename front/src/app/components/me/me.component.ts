import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/features/topics/interfaces/topic.interface';
import { TopicApiService } from 'src/app/features/topics/services/topic.service';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';
import { UserApiService } from 'src/app/services/user.service';



@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
  providers: [FormBuilder]
})
export class MeComponent implements OnInit {

  public user: User | undefined;
  public subscribedTopics: Topic[] |undefined;
  public form!: FormGroup;
  public topics$: Observable<Topic[]> | undefined;
   

  constructor(private router: Router,
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar,
    private userService: UserApiService,
    private fb: FormBuilder,
    private topicService: TopicApiService
    ) {
}



ngOnInit(): void {
  this.getUser();
}

getUser(): void {
  const userId = this.sessionService.sessionInformation?.id;
  if (!userId) {
    this.matSnackBar.open('User not found', 'Close', { duration: 3000 });
    return;
  }

  this.userService.getUserById(userId.toString()).subscribe((user: User) => {
    this.user = user;
    if(this.user.id)
    this.getSubscribedTopics(this.user.id?.toString())
    console.log("user", user);
    this.form = this.fb.group({
      email: [
        user.email,
        [Validators.required, Validators.email]
      ],
      name: [
        user.name || '', 
        [Validators.required, Validators.minLength(3)]
      ],
      password: [
        '',
      ]
    });
    this.form.markAsPristine();
  });
}

update(): void {
  let user = this.form.value as User;

  if (this.user != null && this.user.id != null){
    this.userService.updateUser(this.user.id?.toString(), user).subscribe((_: User) => {
   
      this.matSnackBar.open('Utilisateur mis à jour avec succès !', 'Fermer', { duration: 3000 });
      this.getUser();
    
  
    })
  }
  else {
    this.matSnackBar.open('Échec de la mise à jour de l’utilisateur.', 'Fermer', { duration: 3000 });

  }

 

}

getSubscribedTopics(id: string): void{
  this.topics$ = this.topicService.getSubscribedTopicsByUserId(id);
}

unSubscribe(topic: Topic): void{
  if (topic.id)
  this.topicService.unsubscribe(topic.id.toString(), this.sessionService.sessionInformation!.id.toString())
  .subscribe(_ => {
    this.topics$ = this.topicService.getSubscribedTopicsByUserId(this.sessionService.sessionInformation!.id.toString())
    this.matSnackBar.open("You have successfully unsubscribed from the topic", 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success-snackbar']
    });
  })
}

}
