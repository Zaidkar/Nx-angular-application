import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsMongoId
} from 'class-validator';
import {
    Id,
    ICreateReview,
    IUpsertReview,
    IUpdateReview,
    IUserIdentity
} from '@avans-nx-workshop/shared/api';
import {} from '@avans-nx-workshop/shared/api';

export class UpdateReviewDto implements IUpdateReview {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    title!: string;
}

export class UpsertReviewDto implements IUpsertReview {
    @IsMongoId()
    _id!: Id;
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    hoursPlayed!: number;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    reviewer!: IUserIdentity;

    @IsNotEmpty()
    postDate!: Date;

    @IsNotEmpty()
    score!: number;
}

export class CreateReviewDto implements ICreateReview {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsOptional()
    poster!: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Elden_Ring_Box_art.jpg/220px-Elden_Ring_Box_art.jpg';
}
