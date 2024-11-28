import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { Id } from './id.type';
import { IUserIdentity } from './user.interface';

export interface IGameIdentity extends IEntity {
    title: string;
    description: string;
}

export interface IGame {
    _id: Id;
    title: string;
    description: string;
    poster: string;
    releaseDate: Date;

    developer: string;
    publisher: string;
    platforms: string[];
}

export type ICreateGame = Pick<IGame, 'title' | 'description'>;
export type IUpdateGame = Partial<Omit<IGame, 'id'>>;
export type IUpsertGame = IGame;
