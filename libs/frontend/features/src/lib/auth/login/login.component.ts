import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserIdentity } from '@avans-nx-workshop/shared/api';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm!: FormGroup;
    subs?: Subscription;
    submitted = false;
    loginError: string | null = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                this.validEmail.bind(this)
            ]),
            password: new FormControl(null, [
                Validators.required,
                this.validPassword.bind(this)
            ])
        });

        this.subs = this.authService
            .getUserFromLocalStorage()
            .subscribe((user: IUserIdentity) => {
                if (user) {
                    console.log('User already logged in > to dashboard');
                    this.router.navigate(['/']);
                }
            });
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.submitted = true;
            this.loginError = null;

            const email = this.loginForm.value.email.toLowerCase();
            const password = this.loginForm.value.password;

            this.authService.login(email, password).subscribe({
                next: (user) => {
                    if (user) {
                        console.log('Logged in');
                        this.router.navigate(['/']);
                    }
                    this.submitted = false;
                },
                error: (err) => {
                    this.submitted = false;
                    console.error('Login failed:', err);
                    this.loginError =
                        err?.message || 'Invalid email or password';
                }
            });
        } else {
            this.submitted = false;
            console.error('loginForm invalid');
        }
    }

    validEmail(control: FormControl): { [s: string]: boolean } | null {
        const email = control.value;
        const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return regexp.test(email) ? null : { email: false };
    }

    validPassword(control: FormControl): { [s: string]: boolean } | null {
        const password = control.value;
        const regexp = /^[a-zA-Z]([a-zA-Z0-9]){2,14}$/;
        return regexp.test(password) ? null : { password: false };
    }
}
