import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UserDetailsComponent, UserListComponent],
    exports: [UserDetailsComponent, UserListComponent]
})
export class FeaturesModule {}
