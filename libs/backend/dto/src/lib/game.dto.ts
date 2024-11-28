import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import {
    ICreateGame,
    IGame,
    IUpsertGame,
    IUpdateGame,
    Id
} from '@avans-nx-workshop/shared/api';
import {} from '@avans-nx-workshop/shared/api';

export class UpdateGameDto implements IUpdateGame {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
}

export class UpsertGameDto implements IUpsertGame {
    @IsNotEmpty()
    releaseDate!: Date;

    @IsString()
    @IsNotEmpty()
    developer!: string;

    @IsString()
    @IsNotEmpty()
    publisher!: string;

    @IsNotEmpty()
    platforms!: string[];

    @IsNotEmpty()
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    poster!: 'https://rukminim2.flixcart.com/image/850/1000/kpu3frk0/poster/u/t/x/large-set-of-6-games-wall-poster-for-room-250-gsm-glossy-gaming-original-imag3zkgg5m4wfyh.jpeg?q=20&crop=false';
}

export class CreateGameDto implements ICreateGame {
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
