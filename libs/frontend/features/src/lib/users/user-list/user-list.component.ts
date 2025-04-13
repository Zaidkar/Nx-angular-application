import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo, UserRole } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: []
})
export class UserListComponent implements OnInit, OnDestroy {
    users?: IUserInfo[];
    sub?: Subscription;
    role?: string;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.sub = this.userService
            .getUsers()
            .subscribe((users) => (this.users = users));

        const localUser = localStorage.getItem('currentuser');
        if (localUser) {
            const parsed = JSON.parse(localUser);
            this.role = parsed.role?.toLowerCase();
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    isAdmin(): boolean {
        return this.role === UserRole.Admin.toLowerCase();
    }
}
