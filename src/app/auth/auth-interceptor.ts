import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Recipe } from "../recipes/recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";


@Injectable(
  { providedIn: 'root' }
)
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<Recipe[]>, next: HttpHandler, ) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });


        return next.handle(modifiedReq);
      })
    );
  }

  constructor(private authService: AuthService , private store : Store<fromApp.AppState>) {}
}
