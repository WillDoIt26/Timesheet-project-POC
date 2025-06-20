import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { Signup } from './signup/signup';
import { MyTableDetailComponent } from './my-table-detail/my-table-detail.component';


export const routes: Routes = [
    {path:'',component:LandingComponent},
    {path:'landing',component:LandingComponent},
      { path: 'signup', component: Signup },
       {path:'table',component: MyTableDetailComponent}
        
];
