import { Id } from './id.type';
import { IUserIdentity } from './user.interface';

export interface IGame {
    id: Id;
    title: string;
    description: string;
}

export type ICreateGame = Pick<IGame, 'title' | 'description'>;
export type IUpdateGame = Partial<Omit<IGame, 'id'>>;
export type IUpsertGame = IGame;
