import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Session } from '../../models/session';
import { borrarSession, cargarSesion } from '../../state/session.actions';
import { selectSession } from '../../state/session.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sesion$!: Observable<Session>;
  constructor(private storeSesion: Store<Session>, private router: Router) {
    this.storeSesion.dispatch(cargarSesion());
  }

  ngOnInit(): void {
    this.sesion$ = this.storeSesion.select(selectSession);
  }
  logout() {
    this.storeSesion.dispatch(borrarSession());
    this.router.navigate(['autenticacion/login']);
  }
}
