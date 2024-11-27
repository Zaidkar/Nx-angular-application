import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
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

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.sub = this.userService
            .getUsers()
            .subscribe((users) => (this.users = users));
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
