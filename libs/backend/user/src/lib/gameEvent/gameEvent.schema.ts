import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
    IGameEvent,
    IGameIdentity,
    IUserIdentity
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type GameEventDocument = GameEvent & Document;

@Schema()
export class GameEvent implements IGameEvent {
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
        required: true,
        type: Number
    })
    maxTeams!: number;
    @Prop({
        required: true,
        type: Number
    })
    maxPlayersPerTeam!: number;

    @Prop({
        required: true,
        type: String
    })
    location!: string;
    @Prop({
        required: true,
        type: Date
    })
    startDate!: Date;
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Game'
    })
    game!: IGameIdentity;

    @Prop({
        required: true,
        type: Map,
        of: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }]
    })
    participants!: { [teamName: string]: IUserIdentity[] };

    @Prop({
        required: true,
        type: String
    })
    prize!: string;
}

export const GameEventSchema = SchemaFactory.createForClass(GameEvent);
