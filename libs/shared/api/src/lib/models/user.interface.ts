import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { IMeal } from './meal.interface';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';

export enum UserRole {
    Guest = 'Guest',
    User = 'User',
    Moderator = 'Moderator',
    Admin = 'Admin',
    Unknown = 'Unknown'
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    None = 'None',
    Unknown = 'Unknown'
}

/**
 * Minimal user information
 */

export interface IUserIdentity extends IEntity {
    name: string;
    emailAddress: string;
    password: string;
    profileImgUrl: string;
    role: UserRole;
    token?: string;
}

/**
 * All user information, excl. domain entities
 */
export interface IUserInfo extends IUserRegistration {
    _id: Id;
    profileImgUrl: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
    favoriteGenres: string[];
    favgames: string[];
    preferredPlatform: string;
    country: string;
    city: string;
}

/**
 * All user information, incl. domain entities
 */
export interface IUser extends IUserInfo {}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
