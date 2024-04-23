import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard] },
    {path: 'register', component: RegisterComponent, canActivate: [authGuard] },
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard] }
];
