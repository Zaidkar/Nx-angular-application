import { Component, OnInit } from '@angular/core';
import { IGame } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'app-game-edit',
    templateUrl: './game-edit.component.html'
})
export class GameEditComponent implements OnInit {
    //hard-coded voor de les maar daarna vervangen door service
    game?: IGame;

    constructor() {} //private gameService: GameService

    ngOnInit(): void {
        // this.gameService.getGame().subscribe(game => this.game = game);
        //if met bestaand object om te wijzigen als tie bestaat anders leeg formulier als object nog niet bestaat
        this.game = {
            id: '1',
            title: 'Game 1',
            description: 'Description 1'
        };
    }

    onSubmit(game: IGame): void {
        //checken als tie bestaat en dan update anders createn als tie nog niet bestaat
        //nieuwe objecten hebben nog geen ID dus gebruik dat om te checken of je moet updaten of createn
        // if (this.game) {
        //     this.gameService.updateGame(game).subscribe();
        // } else {
        //     this.gameService.createGame(game).subscribe();
        console.log('onSubmit', game);
    }
}
