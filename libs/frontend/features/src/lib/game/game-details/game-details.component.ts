import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { IGame } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './game-details.component.html',
    styles: []
})
export class GameDetailsComponent implements OnInit, OnDestroy {
    gameId: string | null = null;
    game?: IGame;
    sub?: Subscription;

    constructor(
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            this.gameId = params.get('id');
            this.gameService
                .getGameById(String(this.gameId))
                .subscribe((game) => (this.game = game));
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    deleteGame(id: string): void {
        this.sub?.add(
            this.gameService.deleteGame(id).subscribe((result) => {
                console.log(result);
                this.router.navigate(['..'], { relativeTo: this.route });
            })
        );
    }
}
