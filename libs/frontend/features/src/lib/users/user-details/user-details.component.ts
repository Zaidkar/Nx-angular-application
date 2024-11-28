import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    userId: string | null = null;
    user?: IUserInfo;
    sub?: Subscription;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            this.userId = params.get('id');
            this.userService
                .getUserById(String(this.userId))
                .subscribe((user) => (this.user = user));
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteUser(id: string): void {
        this.sub?.add(
            this.userService.deleteUser(id).subscribe((result) => {
                console.log(result);
                this.router.navigate(['..'], { relativeTo: this.route });
            })
        );
    }
}
