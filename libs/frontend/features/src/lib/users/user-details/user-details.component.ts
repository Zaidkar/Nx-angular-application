import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { UserService } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    user?: IUserInfo;
    subscription?: Subscription;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.paramMap.subscribe((params) => {
            const userId = params.get('id');
            if (userId) {
                this.user = this.userService.getUserById(userId);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            console.log('Unsub from userDetails');
        }
        console.log('UserDetailsComponent destroyed');
    }
}
