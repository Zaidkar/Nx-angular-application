import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { UserService } from './users/user.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [UserDetailsComponent, UserListComponent],
    exports: [UserDetailsComponent, UserListComponent],
    providers: [UserService, provideHttpClient()]
})
export class FeaturesModule {}
