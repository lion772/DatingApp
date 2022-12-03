import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any = [];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.listenToCanceling();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    //this.registerMode = event;
  }

  listenToCanceling() {
    this.configService.cancelRegister$.subscribe({
      next: (res) => (this.registerMode = res),
      error: (err) => console.log(err),
    });
  }
}
