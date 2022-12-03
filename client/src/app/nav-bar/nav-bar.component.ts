import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    public configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmitHandler() {
    this.configService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toastr.success("You've successfully logged in :)", 'It worked!');
      },
      error: (err) => this.toastr.error(err.error, 'An error occurred'),
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
