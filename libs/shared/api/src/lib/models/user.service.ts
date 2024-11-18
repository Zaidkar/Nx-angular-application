import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: IUserInfo[] = [
        {
            _id: '1',
            name: 'Zaid',
            emailAddress: 'z.karmoudi@student.avans.nl',
            profileImgUrl: 'https://i.pravatar.cc/150?img=1',
            role: UserRole.Admin,
            gender: UserGender.Male,
            password: 'password',
            isActive: true
        },
        {
            _id: '2',
            name: 'Joe Doe',
            emailAddress: 'Joe.Doe@gmail.com',
            profileImgUrl: 'https://i.pravatar.cc/150?img=1',
            role: UserRole.Guest,
            gender: UserGender.Unknown,
            password: 'random',
            isActive: true
        }
    ];
    constructor() {
        console.log('Service constructor aangeroepen');
    }

    getUsers(): IUserInfo[] {
        console.log('getUsers aangeroepen');
        return this.users;
    }

    getUsersAsObservable(): Observable<IUserInfo[]> {
        console.log('getUsersAsObservable aangeroepen');
        return of(this.users);
    }

    getUserById(_id: string): IUserInfo {
        console.log('getUserById aangeroepen');
        return this.users.filter((user) => user._id === _id)[0];
    }
}
