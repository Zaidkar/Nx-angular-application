import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IGameEvent, IUserRef, IGame } from '@avans-nx-workshop/shared/api';
import { GameEventService } from '../gameEvent.service';
import { GameService } from '../../game/game.service';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { Types } from 'mongoose';
import {
    CreateGameEventDto,
    UpdateGameEventDto
} from '@avans-nx-workshop/backend/dto';

@Component({
    selector: 'app-game-event-edit',
    templateUrl: './gameEvent-edit.component.html',
    styleUrls: []
})
export class GameEventEditComponent implements OnInit, OnDestroy {
    eventId?: string;
    gameEvent: IGameEvent = {
        _id: new Types.ObjectId().toHexString(),
        game: {
            _id: new Types.ObjectId().toHexString(),
            title: '',
            description: ''
        },
        participants: [],
        startDate: new Date(),
        title: '',
        description: '',
        maxPlayers: 0,
        location: '',
        prize: ''
    };
    games: IGame[] = [];
    private sub?: Subscription;
    errorMessage?: string;

    constructor(
        private eventService: GameEventService,
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.gameService.getGames().subscribe({
            next: (games) => {
                this.games = games;
                console.log('Loaded games list:', this.games);
            },
            error: (err) => console.error('Could not load games list', err)
        });

        this.sub = this.route.paramMap
            .pipe(
                tap((params) => console.log('Route params:', params)),
                switchMap((params: ParamMap) => {
                    const id = params.get('id');
                    if (!id) {
                        this.eventId = undefined;
                        return of(this.gameEvent);
                    } else {
                        this.eventId = id;
                        return this.eventService.getEventById(id);
                    }
                }),
                tap((evt) => console.log('Loaded event:', evt))
            )
            .subscribe({
                next: (evt) => (this.gameEvent = evt),
                error: (err) => console.error('Error loading event', err)
            });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    onSubmit(formEvent: IGameEvent): void {
        formEvent.startDate = new Date(formEvent.startDate);

        formEvent.game = {
            _id: formEvent.game._id,
            title: formEvent.game.title,
            description: formEvent.game.description
        };
        formEvent.participants = formEvent.participants.map((p: IUserRef) => ({
            _id: p._id,
            name: p.name,
            emailAddress: p.emailAddress
        }));

        if (!this.eventId) {
            this.sub?.add(
                this.eventService.createGameEvent(formEvent).subscribe({
                    next: () =>
                        this.router.navigate(['..'], {
                            relativeTo: this.route
                        }),
                    error: (err: { error: { message: string } }) => {
                        console.error('Create error:', err);
                        this.errorMessage =
                            err.error?.message ||
                            'An error occurred while creating the event.';
                    }
                })
            );
        } else {
            formEvent._id = this.eventId;
            this.sub?.add(
                this.eventService.updateGameEvent(formEvent).subscribe({
                    next: () =>
                        this.router.navigate(['../../', this.eventId], {
                            relativeTo: this.route
                        }),
                    error: (err: { error: { message: string } }) => {
                        console.error('Update error:', err);
                        this.errorMessage =
                            err.error?.message ||
                            'An error occurred while updating the event.';
                    }
                })
            );
        }
    }
}
