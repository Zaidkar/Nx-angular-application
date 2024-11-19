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
            profileImgUrl:
                'https://gravatar.com/avatar/309998063e273876223614dd6f59382f?s=400&d=robohash&r=x',
            role: UserRole.Admin,
            gender: UserGender.Male,
            password: 'password',
            isActive: true,
            favoriteGenres: ['MOBA', 'RPG', 'Roguelite'],
            topThreeGames: ['League of Legends', 'Elden Ring', 'Dead cell'],
            preferredPlatform: 'PC',
            country: 'Netherlands',
            city: 'Roosendaal'
        },
        {
            _id: '2',
            name: 'Joe Doe',
            emailAddress: 'Joe.Doe@gmail.com',
            profileImgUrl:
                'https://gravatar.com/avatar/8d8c4ee2bacaa503c56312a8f88a2893?s=400&d=retro&r=x',
            role: UserRole.Guest,
            gender: UserGender.Unknown,
            password: 'random',
            isActive: true,
            favoriteGenres: ['Puzzle', 'FPS'],
            topThreeGames: [
                'Candy Crush',
                'Clash Royale',
                'Call of duty mobile'
            ],
            preferredPlatform: 'Mobile',
            country: 'United States',
            city: 'New York'
        },
        {
            _id: '3',
            name: 'Sarah Smith',
            emailAddress: 'Sarah.Smith@yahoo.com',
            profileImgUrl:
                'https://robohash.org/9b7e23fead9c86c09958a4cf0db23743?set=set4&bgset=&size=400x400',
            role: UserRole.Guest,
            gender: UserGender.Female,
            password: 'password',
            isActive: true,
            favoriteGenres: ['Action', 'Adventure', 'Strategy'],
            topThreeGames: [
                'The Elder Scrolls V: Skyrim',
                'Red Dead Redemption II',
                'The Witcher 3: Wild Hunt'
            ],
            preferredPlatform: 'PC',
            country: 'United Kingdom',
            city: 'London'
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
