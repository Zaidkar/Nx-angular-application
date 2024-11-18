import { Component, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    users: IUser[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        // this.users = this.userService.getUsers();

        this.userService.getUsersAsObservable().subscribe((users) => {
            this.users = users;
        });
    }

    ngOnDestroy(): void {
        if (this.users) {
            console.log('Unsub from userlist');
        }
        console.log('UserListComponent destroyed');
    }
}
