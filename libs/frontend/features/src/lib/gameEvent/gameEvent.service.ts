import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@avans-nx-workshop/shared/util-env';
import {
    ApiResponse,
    IGameEvent,
    IUserRef
} from '@avans-nx-workshop/shared/api';
import {
    CreateGameEventDto,
    UpdateGameEventDto
} from '@avans-nx-workshop/backend/dto';
import { Types } from 'mongoose';

@Injectable({
    providedIn: 'root'
})
export class GameEventService {
    private readonly baseUrl = `${environment.dataApiUrl}/game-events`;

    constructor(private http: HttpClient) {}

    findAll(): Observable<IGameEvent[]> {
        console.log('Fetching all game events from:', this.baseUrl);
        return this.http.get<ApiResponse<IGameEvent[]>>(this.baseUrl).pipe(
            map((response) => (response.results || []).flat()),
            catchError(this.handleError)
        );
    }

    getEventById(id: string): Observable<IGameEvent> {
        return this.http
            .get<ApiResponse<IGameEvent>>(`${this.baseUrl}/${id}`)
            .pipe(
                map((response) => response.results as IGameEvent),
                catchError(this.handleError)
            );
    }

    createGameEvent(event: IGameEvent): Observable<IGameEvent> {
        if (new Date(event.startDate) < new Date()) {
            return throwError({
                error: { message: 'The start date has already passed.' }
            });
        }
        const payload: CreateGameEventDto = {
            title: event.title,
            description: event.description,
            maxPlayers: event.maxPlayers,
            location: event.location,
            startDate: event.startDate,
            prize: event.prize,
            game: new Types.ObjectId(event.game._id),
            participants: event.participants.map(
                (p) => new Types.ObjectId(p._id)
            )
        };

        console.log('Creating game event with payload:', payload);
        return this.http
            .post<ApiResponse<IGameEvent>>(this.baseUrl, payload)
            .pipe(
                map((response) => response.results as IGameEvent),
                catchError((error: HttpErrorResponse) => {
                    console.error('Error creating game event:', error);
                    return throwError(error);
                })
            );
    }

    updateGameEvent(event: IGameEvent): Observable<IGameEvent> {
        if (!event._id) {
            return throwError(
                () => new Error('Cannot update event without an ID')
            );
        }

        if (new Date(event.startDate) < new Date()) {
            return throwError({
                error: { message: 'The start date has already passed.' }
            });
        }

        const payload: UpdateGameEventDto = {
            title: event.title,
            description: event.description,
            maxPlayers: event.maxPlayers,
            location: event.location,
            startDate: event.startDate,
            prize: event.prize,
            game: new Types.ObjectId(event.game._id),
            participants: event.participants.map(
                (p: IUserRef) => new Types.ObjectId(p._id)
            )
        };

        console.log(`Updating game event ${event._id} with payload:`, payload);
        return this.http
            .put<ApiResponse<IGameEvent>>(
                `${this.baseUrl}/${event._id}`,
                payload
            )
            .pipe(
                map((res) => res.results as IGameEvent),
                catchError(this.handleError)
            );
    }

    joinEvent(eventId: string, userId: string): Observable<void> {
        return this.http
            .post<ApiResponse<any>>(`${this.baseUrl}/${eventId}/join`, {
                userId
            })
            .pipe(
                map(() => undefined),
                catchError(this.handleError)
            );
    }

    leaveEvent(eventId: string, userId: string): Observable<void> {
        return this.http
            .post<ApiResponse<any>>(`${this.baseUrl}/${eventId}/leave`, {
                userId
            })
            .pipe(
                map(() => undefined),
                catchError(this.handleError)
            );
    }

    deleteEvent(eventId: string): Observable<void> {
        return this.http
            .delete<ApiResponse<any>>(`${this.baseUrl}/${eventId}`)
            .pipe(
                map(() => undefined),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('GameEventService error:', error);
        return throwError(error);
    }
}
