import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { Id } from './id.type';
import { IUserIdentity } from './user.interface';

export interface IReviewIdentity extends IEntity {
    title: string;
    description: string;
}

export interface IReview {
    _id: Id;
    title: string;
    hoursPlayed: number;
    description: string;
    reviewer: string;
    postDate: Date;
    score: number;
    poster?: string;
}

export type ICreateReview = Pick<IReview, 'title' | 'description'>;
export type IUpdateReview = Partial<Omit<IReview, 'id'>>;
export type IUpsertReview = IReview;
