import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [UserDetailsComponent, UserListComponent],
    exports: [UserDetailsComponent, UserListComponent]
})
export class FeaturesModule {}
