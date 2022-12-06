import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsListComponent } from './components/inscriptions-list/inscriptions-list.component';

const routes: Routes = [{ path: '', component: InscriptionsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionsRoutingModule {}
