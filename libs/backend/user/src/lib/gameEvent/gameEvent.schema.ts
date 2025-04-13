import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { IGameEvent } from '@avans-nx-workshop/shared/api';

export type GameEventDocument = GameEvent & Document;

@Schema()
export class GameEvent implements IGameEvent {
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
    game!: any;

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User',
        default: []
    })
    participants!: Types.ObjectId[];

    @Prop({ required: true })
    prize!: string;
}

export const GameEventSchema = SchemaFactory.createForClass(GameEvent);
