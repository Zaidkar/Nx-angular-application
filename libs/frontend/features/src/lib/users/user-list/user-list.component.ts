import { Component, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    users: IUser[] = [];
    subscription?: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        // this.users = this.userService.getUsers();

        this.subscription = this.userService
            .getUsersAsObservable()
            .subscribe((users) => {
                this.users = users;
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription?.unsubscribe();
            console.log('Unsub from userlist');
        }
        console.log('UserListComponent destroyed');
    }
}
