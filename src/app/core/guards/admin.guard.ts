import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot,  CanActivate,  Router,  RouterStateSnapshot,  UrlTree,} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Session} from '../models/session';
import { selectSession } from '../state/session.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private storeSession: Store<Session>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.storeSession.select(selectSession).pipe(
      map((sesion: Session) => {
        if (sesion.usuarioActivo?.esAdmin) {
          return true;
        } else {
          alert('No tiene permisos para acceder a este sitio');
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }
}
