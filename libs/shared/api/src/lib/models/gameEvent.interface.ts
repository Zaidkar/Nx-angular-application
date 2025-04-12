import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { Id } from './id.type';
import { IGameIdentity } from './game.interface';
import { IUserIdentity } from './user.interface';

export interface IGameEventIdentity extends IEntity {
    title: string;
    description: string;
}

export interface IGameEvent {
    _id: string;
    title: string;
    description: string;
    maxTeams: number;
    maxPlayersPerTeam: number;
    location: string;
    startDate: Date;
    game: IGameIdentity;
    participants: { [teamName: string]: IUserIdentity[] };
    prize: string;
}

export type ICreateGameEvent = Pick<IGameEvent, 'title' | 'description'>;
export type IUpdateGameEvent = Partial<Omit<IGameEvent, 'id'>>;
export type IUpsertGameEvent = IGameEvent;
