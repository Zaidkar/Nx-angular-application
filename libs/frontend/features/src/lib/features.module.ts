import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { UserService } from './users/user.service';
import { provideHttpClient } from '@angular/common/http';
import { GameEditComponent } from './game/game-edit/game-edit.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    declarations: [
        UserDetailsComponent,
        UserListComponent,
        GameEditComponent,
        UserEditComponent
    ],
    exports: [UserDetailsComponent, UserListComponent],
    providers: [UserService, provideHttpClient()]
})
export class FeaturesModule {}
