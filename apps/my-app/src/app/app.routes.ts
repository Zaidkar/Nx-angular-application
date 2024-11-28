import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
    UserListComponent,
    UserDetailsComponent,
    GameEditComponent,
    UserEditComponent
} from '@avans-nx-workshop/features';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'game/new', component: GameEditComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: 'dashboard' }
];
