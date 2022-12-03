import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private configService: ConfigService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.configService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
        this.toastr.success("You've successfully registered :)", 'It worked!');
      },
      error: (err) => {
        console.log(err.error['errors']);
        if (typeof err.error === 'string') {
          this.toastr.error(err.error, 'An error occurred');
        } else {
          let errorList = [];
          for (const key in err.error['errors']) {
            errorList.push(err.error['errors'][key]);
          }
          this.toastr.error(...errorList);
        }
      },
      complete: () => console.log('registration complete!'),
    });
  }

  cancel() {
    //this.cancelRegister.emit(false);
    this.configService.cancelRegister.next(false);
  }
}
