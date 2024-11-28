import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
    UserListComponent,
    UserDetailsComponent,
    GameEditComponent,
    UserEditComponent,
    GameDetailsComponent,
    GameListComponent
} from '@avans-nx-workshop/features';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'games/create', component: GameEditComponent },
    { path: 'games', component: GameListComponent },
    { path: 'games/:id', pathMatch: 'full', component: GameDetailsComponent },
    { path: 'games/:id/edit', component: GameEditComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users/create', component: UserEditComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', pathMatch: 'full', component: UserDetailsComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: 'dashboard' }
];
