import { Injectable, OnDestroy } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IUserIdentity, UserRole } from '@avans-nx-workshop/shared/api';

@Injectable({ providedIn: 'root' })
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            take(1),
            map((user: IUserIdentity | undefined) => {
                const loggedIn = !!user?.token;
                if (!loggedIn) {
                    console.warn('Not logged in → redirecting to /login');
                    this.router.navigate(['/login']);
                }
                return loggedIn;
            })
        );
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.canActivate(route, state);
    }
}

@Injectable({ providedIn: 'root' })
export class LoggedInAsAdminAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            take(1),
            map((user: IUserIdentity | undefined) => {
                const isAdmin = user?.token && user.role === UserRole.Admin;
                if (!isAdmin) {
                    console.warn('Not admin → redirecting to /');
                    this.router.navigate(['/']);
                }
                return !!isAdmin;
            })
        );
    }
}

@Injectable({ providedIn: 'root' })
export class UserEditOwnDataAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const userIdFromRoute = route.paramMap.get('id');

        return this.authService.currentUser$.pipe(
            take(1),
            map((user: IUserIdentity | undefined) => {
                const isOwner = !!user && user._id === userIdFromRoute;
                if (!isOwner) {
                    console.warn('Tried to edit another user → redirecting');
                    this.router.navigate(['/']);
                }
                return isOwner;
            })
        );
    }
}
