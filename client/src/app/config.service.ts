import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private users: any = [];
  private usersUpdated = new Subject<any[]>();
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.users;
  }

  getUsersFromServer() {
    return this.http.get('https://localhost:5001/api/users').subscribe({
      next: (res) => {
        this.users = res;
        this.usersUpdated.next([...this.users]);
      },
      error: (err) => console.log(err),
    });
  }

  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }
}
