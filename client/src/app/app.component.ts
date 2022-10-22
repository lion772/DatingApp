import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';

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
    this.configService.getUsersFromServer();
    this.configService.getUsersUpdatedListener().subscribe((updatedUsers) => {
      this.users = updatedUsers;
      console.log(this.users);
    });
  }
}
