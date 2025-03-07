import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from "../interfaces/loginRequest.interface";
import { RegisterRequest } from "../interfaces/registerRequest.interface";
import { SessionInformation } from "src/app/interfaces/SessionInformation.interface";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    private pathService = 'api/auth';
  
    constructor(private httpClient: HttpClient) { }
  
    public register(registerRequest: RegisterRequest): Observable<void> {
      return this.httpClient.post<void>(`http://localhost:9000/api/auth/register`, registerRequest);
    }
  
    public login(loginRequest: LoginRequest): Observable<SessionInformation> {
      return this.httpClient.post<SessionInformation>(`${this.pathService}/login`, loginRequest);
    }
  }