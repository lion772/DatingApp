import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

interface IUserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private users: any = [];
  private usersUpdated = new Subject<any>();
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.users;
  }

  getUsersFromServer() {
    return this.http.get('https://localhost:5001/api/users').subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
        this.usersUpdated.next([...this.users]);
      },
      error: (err) => console.log(err),
    });
  }

  async getUserLogin(user: IUserLogin) {
    return new Promise((resolve, reject) => {
      this.http
        .post('https://localhost:5001/api/account/login', user, httpOptions)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => reject(err),
        });
    });
  }

  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }
}
