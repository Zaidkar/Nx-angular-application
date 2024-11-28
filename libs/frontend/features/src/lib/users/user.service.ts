import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@avans-nx-workshop/shared/util-env';
import {
    ApiResponse,
    IUserInfo,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<IUserInfo[]> {
        return this.http
            .get<ApiResponse<IUserInfo[]>>(`${environment.dataApiUrl}/user`)
            .pipe(map((response) => (response.results || []).flat()));
    }

    getUserById(_id: string): Observable<IUserInfo> {
        return this.http
            .get<ApiResponse<IUserInfo>>(
                `${environment.dataApiUrl}/user/${_id}`
            )
            .pipe(map((response) => response.results as IUserInfo));
    }

    createUser(user: IUserInfo): Observable<IUserInfo> {
        return this.http.post<IUserInfo>(
            `${environment.dataApiUrl}/user`,
            user
        );
    }

    updateUser(_id: string, user: Partial<IUserInfo>): Observable<IUserInfo> {
        return this.http.put<IUserInfo>(
            `${environment.dataApiUrl}/user/${_id}`,
            user
        );
    }

    deleteUser(id: string): Observable<IUserInfo> {
        return this.http
            .delete<IUserInfo>(`${environment.dataApiUrl}/user/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error('Error deleting user:', error);
                    return throwError(error);
                })
            );

        //export class userservice extends entityservice<IUserInfo> { readonly users?: IUserInfo[];
        // constructor(http: HttpClient) { super(http, environment.dataurlapi '/user'); } }
        //check entityservice.ts in share-a-meal/common/src/lib/entity/entity.service.ts
    }
}
