import { Types } from 'mongoose';
import { Id } from './id.type';
import { IGameIdentity } from './game.interface';

export interface IUserRef {
    _id: string;
    name: string;
    emailAddress: string;
}

export interface IGameEvent {
    _id: Id;
    title: string;
    description: string;
    maxPlayers: number;
    location: string;
    startDate: Date;
    game: IGameIdentity;
    participants: IUserRef[];
    prize: string;
}

export interface ICreateGameEvent {
    title: string;
    description: string;
    game: IGameIdentity;
}

export interface IUpdateGameEvent {
    title?: string;
    description?: string;
    maxPlayers?: number;
    location?: string;
    startDate?: Date;
    game?: IGameIdentity;
    participants?: Id[];
    prize?: string;
}

export interface IUpsertGameEvent {
    _id: string;
    title: string;
    description: string;
    maxPlayers: number;
    location: string;
    startDate: Date;
    game: IGameIdentity;
    participants: Id[];
    prize: string;
}
