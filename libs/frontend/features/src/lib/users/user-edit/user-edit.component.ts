import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { of, Subscription, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    userId?: string;
    user?: IUser;
    sub?: Subscription;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap
            .pipe(
                tap(console.log),
                switchMap((params: ParamMap) => {
                    if (!params.get('id')) {
                        return of({
                            name: '',
                            emailAddress: '',
                            password: '',
                            role: this.user?.role || 'user',
                            active: true
                        });
                    } else {
                        this.userId = String(params.get('id'));
                        return this.userService.getUserById(
                            String(params.get('id'))
                        );
                    }
                }),
                tap(console.log)
            )
            .subscribe((user) => {
                this.user = user;
            });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit(user: IUserInfo): void {
        console.log('onSubmit', user);
        if (this.userId) {
            user._id = this.userId;
            this.sub?.add(
                this.userService.updateUser(user).subscribe(() => {
                    console.log('update');
                    this.router.navigate(['../../' + this.userId], {
                        relativeTo: this.route
                    });
                })
            );
        } else {
            this.sub?.add(
                this.userService.createUser(user).subscribe(() => {
                    console.log('create');
                    this.router.navigate(['..'], { relativeTo: this.route });
                })
            );
        }
    }
}
