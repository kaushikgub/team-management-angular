import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './components/member/member.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  { path: '', component: TeamComponent },
  { path: 'member', component: MemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
