import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IGame, IReview } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type GameDocument = Game & Document;

@Schema()
export class Game implements IGame {
    @Prop({ required: true, type: Date })
    releaseDate!: Date;

    @Prop({ required: true })
    developer!: string;

    @Prop({ required: true })
    publisher!: string;

    @Prop({ required: true, type: [String] })
    platforms!: string[];

    @IsMongoId()
    _id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop()
    poster!: string;

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Review' })
    reviews!: IReview[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
