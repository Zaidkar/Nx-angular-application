import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IReview, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type ReviewDocument = Review & Document;

@Schema()
export class Review implements IReview {
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
    score!: number;

    @Prop({
        required: true,
        type: Date
    })
    postDate!: Date;

    @Prop({
        required: true,
        type: Number
    })
    hoursPlayed!: number;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    reviewer!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
