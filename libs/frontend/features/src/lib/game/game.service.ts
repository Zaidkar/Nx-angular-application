import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '@avans-nx-workshop/shared/util-env';
import {
    ApiResponse,
    IUpdateGame,
    IGame,
    IReview
} from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private http: HttpClient) {}

    getGames(): Observable<IGame[]> {
        return this.http
            .get<ApiResponse<IGame[]>>(`${environment.dataApiUrl}/game`)
            .pipe(map((response) => (response.results || []).flat()));
    }

    getGameById(_id: string): Observable<IGame> {
        return this.http
            .get<ApiResponse<IGame>>(`${environment.dataApiUrl}/game/${_id}`)
            .pipe(map((response) => response.results as IGame));
    }

    createGame(game: IGame): Observable<IGame> {
        return this.http
            .post<ApiResponse<any>>(`${environment.dataApiUrl}/game`, game)
            .pipe(map((response) => response.results));
    }

    updateGame(game: IUpdateGame): Observable<IGame> {
        return this.http
            .put<ApiResponse<any>>(
                `${environment.dataApiUrl}/game/${game._id}`,
                game
            )
            .pipe(
                tap(console.log),
                map((response) => response.results)
            );
    }

    deleteGame(id: string): Observable<IGame> {
        return this.http
            .delete<IGame>(`${environment.dataApiUrl}/game/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error('Error deleting Game:', error);
                    return throwError(error);
                })
            );
    }

    addReview(gameId: string, review: IReview): Observable<IGame> {
        return this.http
            .post<ApiResponse<IGame>>(
                `${environment.dataApiUrl}/game/${gameId}/reviews`,
                review
            )
            .pipe(
                map((response) => {
                    const result = response.results;
                    if (!result || Array.isArray(result)) {
                        throw new Error('Invalid API response for addReview.');
                    }
                    return result;
                })
            );
    }
}
