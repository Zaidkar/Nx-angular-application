import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsArray,
    IsMongoId
} from 'class-validator';
import {
    IUpdateGameEvent,
    IUpsertGameEvent,
    ICreateGameEvent,
    IGameIdentity,
    Id
} from '@avans-nx-workshop/shared/api';

export class UpdateGameEventDto implements IUpdateGameEvent {
    _id?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    maxPlayers?: number;

    @IsString()
    @IsOptional()
    location?: string;

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    game?: IGameIdentity;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    participants?: Id[];

    @IsString()
    @IsOptional()
    prize?: string;
}

export class UpsertGameEventDto implements IUpsertGameEvent {
    @IsNotEmpty()
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    maxPlayers!: number;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsNotEmpty()
    @IsDate()
    startDate!: Date;

    @IsNotEmpty()
    game!: IGameIdentity;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    participants!: Id[];

    @IsString()
    @IsOptional()
    prize!: string;
}

export class CreateGameEventDto implements ICreateGameEvent {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    game!: IGameIdentity;
}
