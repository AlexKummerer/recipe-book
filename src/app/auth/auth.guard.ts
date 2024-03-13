import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {

//   const authService = new AuthService(); // Remove the extra closing parenthesis
//   return authService.user.pipe(map(user => {
//     return !!user;
//   }), take(1)
//   );
// };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);

      }),
      take(1)
    );


    // Use this.authService here
  }
}
