import { Component, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styles: []
})
export class ListComponent implements OnInit {
    users: IUser[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.users = this.userService.getUsers();
    }
}
