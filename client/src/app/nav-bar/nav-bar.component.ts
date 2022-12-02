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

  ngOnInit(): void {}

  async onSubmitHandler() {
    const data = await this.httpService.login(this.model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });

    console.log(data && data['username']);
  }
}

/* Other way to get input data:
console.log(loginForm.form.controls.username.value);
console.log(loginForm.form.controls.password.value);
 */
