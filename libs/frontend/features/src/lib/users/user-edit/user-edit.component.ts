import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    user?: IUser;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        //if met bestaand object om te wijzigen als tie bestaat anders leeg formulier als object nog niet bestaat
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
            this.userService.getUserById(userId).subscribe((user) => {
                this.user = user;
            });
        }
    }

    onSubmit(user: IUser): void {
        //checken als tie bestaat en dan update anders createn als tie nog niet bestaat
        //nieuwe objecten hebben nog geen ID dus gebruik dat om te checken of je moet updaten of createn
        if (user._id) {
            this.userService.updateUser(user._id, user).subscribe(() => {
                this.router.navigate(['/users', user._id]);
            });
        } else {
            this.userService.createUser(user).subscribe((newUser) => {
                this.router.navigate(['/users', newUser._id]);
            });
        }
        console.log('onSubmit', user);
    }
}
