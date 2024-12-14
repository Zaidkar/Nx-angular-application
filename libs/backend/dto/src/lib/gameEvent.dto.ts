import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    isNotEmpty,
    IsDate
} from 'class-validator';
import {
    IUpdateGameEvent,
    IUpsertGameEvent,
    ICreateGameEvent,
    IGameIdentity,
    IUserIdentity,
    Id
} from '@avans-nx-workshop/shared/api';
import {} from '@avans-nx-workshop/shared/api';

export class UpdateGameEventDto implements IUpdateGameEvent {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
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
    maxTeams!: number;

    @IsNotEmpty()
    maxPlayersPerTeam!: number;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsNotEmpty()
    @IsDate()
    startDate!: Date;

    @IsNotEmpty()
    game!: IGameIdentity;

    participants!: { [teamName: string]: IUserIdentity[] };

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

    game!: IGameIdentity;
}
