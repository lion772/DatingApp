import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  model: any = {};

  constructor(private httpService: ConfigService) {}

  ngOnInit(): void {}

  async onSubmitHandler({ username, password }) {
    console.log(username, password);
    console.log(this.model.username, this.model.password);
    const dataReturned = await this.httpService.getUserLogin({
      username: username,
      password: password,
    });
    console.log(dataReturned && dataReturned['username']);
  }
}
