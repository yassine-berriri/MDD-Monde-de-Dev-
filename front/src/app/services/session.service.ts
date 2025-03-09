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

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor() {
    this.loadSessionFromStorage();
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
    
    this.isLogged = isLoggedData ? JSON.parse(isLoggedData) : false;
    
    if (sessionData && this.isLogged) {
      this.sessionInformation = JSON.parse(sessionData);
      this.next();
    }
  }

  private clearSessionFromStorage(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
    localStorage.removeItem(this.IS_LOGGED_KEY);
    //a
  }

}
