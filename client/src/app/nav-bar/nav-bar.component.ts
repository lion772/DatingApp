import { Component, OnInit } from '@angular/core';
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

  constructor(public configService: ConfigService) {}

  ngOnInit(): void {}

  onSubmitHandler() {
    this.configService.login(this.model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  logout() {
    this.configService.logout();
  }
}

/* Other way to get input data:
console.log(loginForm.form.controls.username.value);
console.log(loginForm.form.controls.password.value);
 */
