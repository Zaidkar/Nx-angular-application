import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ApiResponse, IUpdateGame, IGame } from '@avans-nx-workshop/shared/api';

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

    createGame(Game: IGame): Observable<IGame> {
        return this.http
            .post<ApiResponse<any>>(environment.dataApiUrl + '/game', Game)
            .pipe(map((response) => response.results));
    }

    updateGame(Game: IUpdateGame): Observable<IGame> {
        return this.http
            .put<ApiResponse<any>>(
                environment.dataApiUrl + '/game/' + Game._id,
                Game
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

        //export class Gameservice extends entityservice<IGameInfo> { readonly Games?: IGameInfo[];
        // constructor(http: HttpClient) { super(http, environment.dataurlapi '/Game'); } }
        //check entityservice.ts in share-a-meal/common/src/lib/entity/entity.service.ts
    }
}
