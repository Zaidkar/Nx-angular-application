import { Id } from '@avans-nx-workshop/shared/api';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsArray,
    IsMongoId,
    IsNumber,
    Min
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateGameEventDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    maxPlayers?: number;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsMongoId()
    game?: Types.ObjectId;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    participants?: Types.ObjectId[];

    @IsOptional()
    @IsString()
    prize?: string;
}

export class UpsertGameEventDto {
    @IsNotEmpty()
    @IsMongoId()
    _id!: Id;

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    maxPlayers!: number;

    @IsNotEmpty()
    @IsString()
    location!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate!: Date;

    @IsNotEmpty()
    @IsMongoId()
    game!: Types.ObjectId;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    participants!: Types.ObjectId[];

    @IsOptional()
    @IsString()
    prize!: string;
}

export class CreateGameEventDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    maxPlayers!: number;
    @IsOptional()
    location!: string;
    @IsOptional()
    startDate!: Date;
    @IsOptional()
    prize!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsMongoId()
    game!: Types.ObjectId;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    participants!: Types.ObjectId[];
}
