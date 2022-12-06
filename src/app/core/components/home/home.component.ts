import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Session } from '../../models/session';
import { cargarMenuActivo } from '../../state/session.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private storeSession: Store<Session>) {}

  ngOnInit(): void {
    this.storeSession.dispatch(cargarMenuActivo({ menuActivo: 'Home' }));
  }
}
