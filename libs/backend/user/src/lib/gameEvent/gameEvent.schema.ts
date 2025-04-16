import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import {
    Id,
    IGameEvent,
    IGameIdentity,
    IUserRef
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type GameEventDocument = GameEvent & Document;

@Schema()
export class GameEvent implements IGameEvent {
    @IsMongoId()
    _id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    maxPlayers!: number;

    @Prop({ required: true })
    location!: string;

    @Prop({ required: true })
    startDate!: Date;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Game' })
    game!: IGameIdentity;

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User'
    })
    participants!: IUserRef[];

    @Prop({ required: true })
    prize!: string;
}

export const GameEventSchema = SchemaFactory.createForClass(GameEvent);
