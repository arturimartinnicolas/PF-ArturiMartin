import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Session } from '../../models/session';
import { selectSession } from '../../state/session.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sesion!: Session;
  subscripcion!: Subscription;

  constructor(private storeSesion: Store<Session>) {}
  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscripcion = this.storeSesion
      .select(selectSession)
      .subscribe((sesion) => (this.sesion = sesion));
  }
}
