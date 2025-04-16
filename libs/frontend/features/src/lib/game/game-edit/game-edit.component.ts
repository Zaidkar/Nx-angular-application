import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IGame, IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
import { GameService } from '../game.service';
import { of, Subscription, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-game-edit',
    templateUrl: './game-edit.component.html'
})
export class GameEditComponent implements OnInit {
    gameId?: string;
    game?: IGame;
    sub?: Subscription;
    errorMessage?: string;

    constructor(
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap
            .pipe(
                tap(console.log),
                switchMap((params: ParamMap) => {
                    if (!params.get('id')) {
                        return of({});
                    } else {
                        this.gameId = String(params.get('id'));
                        return this.gameService.getGameById(
                            String(params.get('id'))
                        );
                    }
                }),
                tap(console.log)
            )
            .subscribe((game) => {
                this.game = game;
            });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit(game: IGame): void {
        console.log('onSubmit', game);
        if (this.gameId) {
            game._id = this.gameId;
            this.sub?.add(
                this.gameService.updateGame(game).subscribe({
                    next: () => {
                        console.log('update');
                        this.router.navigate(['../../' + this.gameId], {
                            relativeTo: this.route
                        });
                    },
                    error: (err) => {
                        console.error('Update error:', err);
                        this.errorMessage =
                            err.error?.message ||
                            'An error occurred while updating the game.';
                    }
                })
            );
        } else {
            this.sub?.add(
                this.gameService.createGame(game).subscribe({
                    next: () => {
                        console.log('create');
                        this.router.navigate(['..'], {
                            relativeTo: this.route
                        });
                    },
                    error: (err) => {
                        console.error('Create error:', err);
                        this.errorMessage =
                            err.error?.message ||
                            'An error occurred while creating the game.';
                    }
                })
            );
        }
    }
}
