import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/SessionInformation.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
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
      private router: Router,
      private matSnackBar: MatSnackBar,
      private sessionService: SessionService) {
  }

  ngOnInit(): void {
  }

  public login(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        this.sessionService.logIn(response);
        this.matSnackBar.open("You have successfully logged in!", 'Close', { 
          duration: 3000,
          verticalPosition: 'top', 
          horizontalPosition: 'center', 
          panelClass: ['success-snackbar'] 
        });
        
        this.router.navigate(['/topics']);
      },
      error: _ =>{
        this.showError(_.message);
      } ,
    });
  }

  public handleLandingPage(): void {
    this.router.navigate(['/']);
  }

  showError(error: String): void {
    this.matSnackBar.open("Signup failed."+ error + " Please try again! ❌ ", 'Close', { 
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar']
    });
  }

}
