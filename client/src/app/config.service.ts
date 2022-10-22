import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private users: any[] = [];
  private usersUpdated = new Subject<any[]>();
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.users;
  }

  getUsersFromServer() {
    this.http
      .get<{ user: any[] }>('https://localhost:5001/api/users')
      .pipe(
        map((dataRetrieved) => {
          return dataRetrieved.user.map((user) => {
            return {
              id: user._id,
              username: user.username,
            };
          });
        })
      )
      .subscribe((users) => {
        console.log(users);
        this.users = users;
        this.usersUpdated.next([...users]);
      });
  }

  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }
}
