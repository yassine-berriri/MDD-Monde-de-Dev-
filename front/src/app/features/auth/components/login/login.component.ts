import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/SessionInformation.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public onError = false;
  
    public form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
  
      password: [
        '',
        [
          Validators.required,
          Validators.min(3),
          Validators.max(40)
        ]
      ]
    });

  constructor(private authService: AuthService,
      private fb: FormBuilder,
      private router: Router) {
  }

  ngOnInit(): void {
  }

  public login(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        //this.sessionService.logIn(response);
        this.router.navigate(['/']);
      },
      error: error => this.onError = true,
    });
  }

  public handleLandingPage(): void {
    this.router.navigate(['/']);
  }

}
