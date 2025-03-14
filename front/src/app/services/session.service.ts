import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/SessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

private readonly SESSION_STORAGE_KEY = 'sessionInfo';
private readonly IS_LOGGED_KEY = 'isLogged';


  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;
  private isReadySubject = new BehaviorSubject<boolean>(false);


  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor() {
    this.loadSessionFromStorage();
    this.isReadySubject.next(true);

  }

  public isReady(): Observable<boolean> {
    return this.isReadySubject.asObservable();
  }

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.saveSessionToStorage();
    this.next();
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.clearSessionFromStorage();
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }


  private saveSessionToStorage(): void {
    
    if (this.sessionInformation) {
      localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(this.sessionInformation));
    }
    localStorage.setItem(this.IS_LOGGED_KEY, JSON.stringify(this.isLogged));
    
  }

  private loadSessionFromStorage(): void {
    
    const sessionData = localStorage.getItem(this.SESSION_STORAGE_KEY);
    const isLoggedData = localStorage.getItem(this.IS_LOGGED_KEY);
  
    console.log("Session data from storage:", sessionData);  
    console.log("Is logged from storage:", isLoggedData);  
  
    this.isLogged = isLoggedData ? JSON.parse(isLoggedData) : false;
  
    if (sessionData && this.isLogged) {
      try {
        this.sessionInformation = JSON.parse(sessionData);
        if (!this.sessionInformation?.token) {
          throw new Error("Token is missing after refresh");
        }
        this.next();
      } catch (error) {
        console.error("Error loading session from storage:", error);
        this.sessionInformation = undefined;
        this.isLogged = false;
        this.clearSessionFromStorage();
      }
    }
  
    console.log("Token after loading:", this.sessionInformation?.token);
    
  }
  

  private clearSessionFromStorage(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
    localStorage.removeItem(this.IS_LOGGED_KEY);
    
  }

}
