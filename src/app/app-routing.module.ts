import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesListComponent } from './houses/houses-list/houses-list.component';
import { MembersListComponent } from './members/members-list/members-list.component';

const routes: Routes = [
  { path: '', component: HousesListComponent},
  { path: ':house', component: MembersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
