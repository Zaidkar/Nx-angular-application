import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {
    IMeal,
    IUser,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    name!: string;

    @Prop({
        required: false,
        select: false,
        type: String
    })
    password = 'secret';

    @Prop({
        required: true,
        type: String,
        select: true,
        unique: true
    })
    emailAddress = '';

    @Prop({
        required: false,
        select: true,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png'
    })
    profileImgUrl!: string;

    @Prop({
        required: false,
        type: [String],
        default: []
    })
    favoriteGenres: string[] = [];

    @Prop({
        required: false,
        type: [String],
        default: []
    })
    favgames: string[] = [];

    @Prop({
        required: false,
        type: String,
        default: ''
    })
    preferredPlatform: string = '';

    @Prop({
        required: false,
        type: String,
        default: ''
    })
    country: string = '';

    @Prop({
        required: false,
        type: String,
        default: ''
    })
    city: string = '';

    @Prop({
        required: false,
        type: String,
        default: UserRole.Guest
    })
    role: UserRole = UserRole.Guest;

    @Prop({
        required: false,
        type: String,
        default: UserGender.Unknown
    })
    gender: UserGender = UserGender.Unknown;

    @Prop({
        required: false,
        type: Boolean,
        default: true
    })
    isActive = true;
}

export const UserSchema = SchemaFactory.createForClass(User);
