import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any = [];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.configService.getUsersFromServer().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => console.log(err),
      complete: () => console.log('Request has completed'),
    });
  }

  setCurrentUser() {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    currentUser && this.configService.setCurrentUser(currentUser);
  }
}
/* So whilst at the moment we're just using it for HTTP requests or we are about to, in future we'll find

that this is a good place to store state that we want our application to remember no matter where that

user is in our application. */
