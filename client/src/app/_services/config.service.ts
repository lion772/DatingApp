import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject, throwError } from 'rxjs';
import { User } from '../models/user';

interface IUser {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  baseUrl = 'https://localhost:5001/api';
  cancelRegister = new BehaviorSubject<boolean | null>(null);
  cancelRegister$ = this.cancelRegister.asObservable();
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  getUsersFromServer() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  login(user: IUser) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: IUser) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  /* isLoggedIn(): boolean {
    return localStorage.getItem('user') ? (this.localstorage = true) : false;
  } */
}
