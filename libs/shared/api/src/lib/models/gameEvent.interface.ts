import { Types } from 'mongoose';
import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { Id } from './id.type';
import { IGameIdentity } from './game.interface';

export interface IGameEventIdentity extends IEntity {
    title: string;
    description: string;
}

export interface IGameEvent {
    _id: string;
    title: string;
    description: string;
    maxPlayers: number;
    location: string;
    startDate: Date;
    game: IGameIdentity;
    participants: (Id | Types.ObjectId)[];
    prize: string;
}

export type ICreateGameEvent = Pick<
    IGameEvent,
    'title' | 'description' | 'game'
>;
export type IUpdateGameEvent = Partial<Omit<IGameEvent, '_id'>>;
export type IUpsertGameEvent = IGameEvent;
