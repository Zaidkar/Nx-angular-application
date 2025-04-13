import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { Id } from './id.type';
import { IUserIdentity } from './user.interface';
import { IReview } from './review.interface';

export interface IGame {
    _id: Id;
    title: string;
    description: string;
    poster: string;
    releaseDate: Date;
    developer: string;
    publisher: string;
    platforms: string[];
    reviews?: IReview[];
}

export interface IGameIdentity extends IEntity {
    title: string;
    description: string;
}

export type ICreateGame = Pick<IGame, 'title' | 'description'>;
export type IUpdateGame = Partial<Omit<IGame, 'id'>>;
export type IUpsertGame = IGame;
