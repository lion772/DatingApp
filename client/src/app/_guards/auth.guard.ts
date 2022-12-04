import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ConfigService } from '../_services/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.configService.currentUser$.pipe(
      map((user) => {
        console.log(user);
        if (user) return true;
        this.toastr.error('You shall not pass!');
      })
    );
  }
}

/* the route guard is responsible to handle the subscribe/unsubscribe once it has done its job.

If you access anything in angular that is an observable, then as you can see in the code above, we do not need to use subscribe() to subscribe to it.  */
