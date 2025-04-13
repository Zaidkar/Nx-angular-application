import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
    IUserInfo,
    IUserIdentity,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
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
    currentUser?: IUserIdentity;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            this.userId = params.get('id');

            const stored = localStorage.getItem('currentuser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }

            this.userService
                .getUserById(String(this.userId))
                .subscribe((user) => {
                    this.user = user;
                    this.updateLocalUserIfNeeded(user);
                });
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteUser(id: string): void {
        this.sub?.add(
            this.userService.deleteUser(id).subscribe(() => {
                const currentId = this.currentUser?._id;
                const isSelf = currentId === id;

                if (isSelf) {
                    localStorage.removeItem('currentuser');
                    this.router.navigate(['/']);
                } else {
                    this.router.navigate(['..'], { relativeTo: this.route });
                }
            })
        );
    }

    canEditOrDelete(): boolean {
        return (
            this.currentUser?.role?.toLowerCase() ===
                UserRole.Admin.toLowerCase() ||
            this.currentUser?._id === this.user?._id
        );
    }

    updateLocalUserIfNeeded(user: IUserInfo): void {
        const stored = localStorage.getItem('currentuser');
        if (stored) {
            const current = JSON.parse(stored);
            if (current._id === user._id) {
                const updatedUser = {
                    ...current,
                    name: user.name,
                    emailAddress: user.emailAddress,
                    profileImgUrl: user.profileImgUrl,
                    role: user.role,
                    gender: user.gender,
                    isActive: user.isActive,
                    favoriteGenres: user.favoriteGenres,
                    favgames: user.favgames,
                    preferredPlatform: user.preferredPlatform,
                    country: user.country,
                    city: user.city
                };
                localStorage.setItem(
                    'currentuser',
                    JSON.stringify(updatedUser)
                );
            }
        }
    }
}
