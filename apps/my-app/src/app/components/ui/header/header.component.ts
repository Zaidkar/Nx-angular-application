import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../../../../../../../libs/frontend/features/src/lib/auth/auth.service';
import { IUserIdentity } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    user$: Observable<IUserIdentity | undefined>;

    constructor(private authService: AuthService) {
        this.user$ = this.authService.currentUser$;
    }

    logout(): void {
        this.authService.logout();
    }
}
