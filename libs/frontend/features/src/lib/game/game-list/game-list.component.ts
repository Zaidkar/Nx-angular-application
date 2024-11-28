import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame, IUserInfo } from '@avans-nx-workshop/shared/api';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './game-list.component.html',
    styleUrls: []
})
export class GameListComponent implements OnInit, OnDestroy {
    games?: IGame[];
    sub?: Subscription;

    constructor(private userService: GameService) {}

    ngOnInit(): void {
        this.sub = this.userService
            .getGames()
            .subscribe((games) => (this.games = games));
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
