import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent} from './signup/signup';
import { Login } from './login/login';
import { Table } from './table/table';


export const routes: Routes = [
    {path:'',component:LandingComponent},
    {path:'landing',component:LandingComponent},
    { path: 'signup', component:SignupComponent },
    { path: 'login', component: Login},
    {path:'table',component:Table}
];
