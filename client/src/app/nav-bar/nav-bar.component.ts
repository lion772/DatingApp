import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public configService: ConfigService, private router: Router) {}

  ngOnInit(): void {}

  onSubmitHandler() {
    this.configService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: (err) => console.log(err),
    });
  }

  logout() {
    this.configService.logout();
    this.router.navigateByUrl('/');
  }
}

/* Other way to get input data:
console.log(loginForm.form.controls.username.value);
console.log(loginForm.form.controls.password.value);
 */
