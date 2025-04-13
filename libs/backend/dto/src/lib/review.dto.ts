import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsNumber,
    ValidateNested,
    IsMongoId
} from 'class-validator';
import { Type } from 'class-transformer';
import { IReview, IUser, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { User } from '@avans-nx-workshop/backend/user';

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsDate()
    @Type(() => Date)
    postDate!: Date;

    @IsNumber()
    @IsNotEmpty()
    hoursPlayed!: number;

    @IsNumber()
    @IsNotEmpty()
    score!: number;

    reviewer!: IUserIdentity | IUser | string;
}

export class UpdateReviewDto {}
