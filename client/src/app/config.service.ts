import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';

interface IUserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  baseUrl = 'https://localhost:5001/api';
  private users: any = [];
  private usersUpdated = new Subject<any>();
  constructor(private http: HttpClient) {}

  getUsersFromServer() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  login(user: IUserLogin) {
    return this.http.post(`${this.baseUrl}/account/login`, user);
  }
}
