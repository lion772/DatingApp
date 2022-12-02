import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model = {
    username: '',
    password: '',
  };

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {}

  register() {
    /* this.configService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (error) => {
        console.log(error);
      }
    ); */

    this.configService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
      complete: () => console.log('registration complete!'),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
