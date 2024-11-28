import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IGame } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type GameDocument = Game & Document;

@Schema()
export class Game implements IGame {
    @Prop({
        required: true,
        type: Date
    })
    releaseDate!: Date;

    @Prop({
        required: true,
        type: String
    })
    developer!: string;

    @Prop({
        required: true,
        type: String
    })
    publisher!: string;
    @Prop({
        required: true,
        type: [String]
    })
    platforms!: string[];
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    title!: string;

    @Prop({
        required: true,
        type: String
    })
    description!: string;

    @Prop({
        required: false,
        type: String
    })
    poster!: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
