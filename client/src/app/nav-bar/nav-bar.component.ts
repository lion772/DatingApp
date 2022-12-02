import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  model = {
    username: '',
    password: '',
  };
  loggedIn = false;

  constructor(private httpService: ConfigService) {}

  ngOnInit(): void {
    /* this.httpService.isLoggedIn()
      ? (this.loggedIn = true)
      : (this.loggedIn = false);
    console.log(this.loggedIn); */
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.httpService.currentUser$.subscribe({
      next: (user) => {
        console.log(user);
        this.loggedIn = !!user;
      }, //transforms an obj into a boolean, where if it exists, it'll assign to true
      error: (err: Error) => console.log(err.message),
    });
  }

  onSubmitHandler() {
    this.httpService.login(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.loggedIn = true;
      },
      error: (err) => console.log(err),
    });
  }

  logout() {
    this.loggedIn = false;
    this.httpService.logout();
  }
}

/* Other way to get input data:
console.log(loginForm.form.controls.username.value);
console.log(loginForm.form.controls.password.value);
 */
