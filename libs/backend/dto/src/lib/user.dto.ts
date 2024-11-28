import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsArray
} from 'class-validator';
import {
    // ICreateUser,
    IUpdateUser,
    IUpsertUser,
    IUserRegistration,
    Id,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { Meal } from '@avans-nx-workshop/backend/features';

export class CreateUserDto implements IUserRegistration {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;
}

export class UpsertUserDto implements IUpsertUser {
    @IsArray()
    @IsNotEmpty()
    favoriteGenres: string[] = [];

    @IsArray()
    @IsNotEmpty()
    topThreeGames: string[] = [];

    @IsString()
    @IsNotEmpty()
    preferredPlatform: string = '';

    @IsString()
    @IsNotEmpty()
    country: string = '';

    @IsString()
    @IsNotEmpty()
    city: string = '';

    _id!: Id;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive!: boolean;

    @IsString()
    @IsNotEmpty()
    profileImgUrl = '';

    @IsString()
    @IsNotEmpty()
    role: UserRole = UserRole.Unknown;

    @IsString()
    @IsNotEmpty()
    gender: UserGender = UserGender.Unknown;
}

export class UpdateUserDto implements IUpdateUser {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
}
