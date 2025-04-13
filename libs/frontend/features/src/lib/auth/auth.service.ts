import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import {
    IUserRegistration,
    IUserIdentity
} from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { AlertService } from '@avans-nx-workshop/shared/alert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../users/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser$ = new BehaviorSubject<IUserIdentity | undefined>(
        undefined
    );
    private readonly CURRENT_USER = 'currentuser';
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(
        private alertService: AlertService,
        private http: HttpClient,
        private router: Router,
        private userService: UserService
    ) {
        // Check of we al een ingelogde user hebben
        // Zo ja, check dan op de backend of het token nog valid is.
        // Het token kan namelijk verlopen zijn. Indien verlopen
        // retourneren we meteen een nieuw token.
        this.getUserFromLocalStorage()
            .pipe(
                // switchMap is overbodig als we validateToken() niet gebruiken...
                switchMap((user: IUserIdentity) => {
                    if (user) {
                        console.log('User found in local storage');
                        this.currentUser$.next(user);
                        //return this.validateToken(user);
                        return of(user);
                    } else {
                        console.log(`No current user found`);
                        return of(undefined);
                    }
                })
            )
            .subscribe(() => console.log('Startup auth done'));
    }

    login(
        email: string,
        password: string
    ): Observable<IUserIdentity | undefined> {
        console.log(`login at ${environment.dataApiUrl}/auth/login`);

        return this.http
            .post<{ results: any }>(
                `${environment.dataApiUrl}/auth/login`,
                { emailAddress: email, password: password },
                { headers: this.headers }
            )
            .pipe(
                map((response) => {
                    if (response.results?.response?.error != undefined) {
                        throw new Error(response.results.response.message);
                    }
                    const user = response.results;
                    this.saveUserToLocalStorage(user);
                    this.currentUser$.next(user);
                    this.alertService.success('You have been logged in');
                    return user;
                }),
                catchError((error: any) => {
                    console.log('error:', error);

                    throw error;
                })
            );
    }

    register(
        userData: IUserRegistration
    ): Observable<IUserIdentity | undefined> {
        console.log(`register at ${environment.dataApiUrl}/user`);
        console.log(userData);

        return this.http
            .post<any>(`${environment.dataApiUrl}/user`, userData, {
                headers: this.headers
            })
            .pipe(
                map((user) => {
                    console.dir(user);
                    this.alertService.success('You have been registered');
                    return user.results;
                }),
                catchError((error: any) => {
                    console.log('error:', error);
                    console.log('error.message:', error.message);
                    console.log('error.error.message:', error.error.message);
                    this.alertService.error(
                        error.error.message || error.message
                    );
                    return of(undefined);
                })
            );
    }

    /**
     * Validate het token bij de backend API. Als er geen HTTP error
     * als response komt is het token nog valid. We doen dan verder niets.
     * Als het token niet valid is loggen we de user uit.
     */
    validateToken(
        userData: IUserIdentity
    ): Observable<IUserIdentity | undefined> {
        const url = `${environment.dataApiUrl}/auth/profile`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userData.token
            })
        };

        console.log(`validateToken at ${url}`);
        return this.http.get<any>(url, httpOptions).pipe(
            map((response) => {
                console.log('token is valid');
                return response;
            }),
            catchError((error: any) => {
                console.log('Validate token Failed');
                this.logout();
                this.currentUser$.next(undefined);
                return of(undefined);
            })
        );
    }

    logout(): void {
        this.router
            .navigate(['/'])
            .then((success) => {
                if (success) {
                    console.log('logout - removing local user info');
                    localStorage.removeItem(this.CURRENT_USER);
                    this.currentUser$.next(undefined);
                    this.alertService.success('You have been logged out.');
                } else {
                    console.log('navigate result:', success);
                }
            })
            .catch((error) => console.log('not logged out!'));
    }

    getUserFromLocalStorage(): Observable<IUserIdentity> {
        const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
        return of(localUser);
    }

    saveUserToLocalStorage(user: IUserIdentity): void {
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
    }

    userMayEdit(itemUserId: string): Observable<boolean> {
        return this.currentUser$.pipe(
            map((user: IUserIdentity | undefined) =>
                user ? user._id === itemUserId : false
            )
        );
    }
}
