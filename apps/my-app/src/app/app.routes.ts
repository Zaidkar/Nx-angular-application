import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
    UserListComponent,
    UserDetailsComponent,
    GameEditComponent
} from '@avans-nx-workshop/features';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'game/new', component: GameEditComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'about', component: AboutComponent },
    // Catch-all route: als er geen URL match is wordt doorgestuurd naar de dashboard (homepage voor nu)
    { path: '**', redirectTo: 'dashboard' }
];
