import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup';
import { Login} from './login/login';
import { Table } from './table/table';
import { Project} from './project/project';

const routes: Routes = [
  // Add your routes here, for example:
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: Login},
  {path: 'table', component: Table},
  {path: 'project', component: Project},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
