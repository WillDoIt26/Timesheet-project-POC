import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup';
import { Login} from './login/login';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: Login}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

