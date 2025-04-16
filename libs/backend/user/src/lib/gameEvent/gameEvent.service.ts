import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGameEvent } from '@avans-nx-workshop/shared/api';
import {
    CreateGameEventDto,
    UpdateGameEventDto
} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class GameEventService {
    constructor(
        @InjectModel('GameEvent')
        private readonly gameEventModel: Model<IGameEvent>
    ) {}

    async findAll(): Promise<IGameEvent[]> {
        console.log('Fetching all game events from the database');
        return this.gameEventModel
            .find()
            .populate('game')
            .populate('participants', 'name emailAddress')
            .exec();
    }

    async findOne(id: string): Promise<IGameEvent | null> {
        return this.gameEventModel
            .findById(id)
            .populate('game')
            .populate('participants', 'name emailAddress')
            .exec();
    }

    async create(createGameEventDto: CreateGameEventDto): Promise<IGameEvent> {
        const createdGame = new this.gameEventModel(createGameEventDto);
        console.log('Creating game event with data: ', createGameEventDto);

        return createdGame.save();
    }

    async update(
        id: string,
        updateGameEventDto: UpdateGameEventDto
    ): Promise<IGameEvent | null> {
        return this.gameEventModel
            .findByIdAndUpdate(id, updateGameEventDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<IGameEvent | null> {
        return this.gameEventModel.findByIdAndDelete(id).exec();
    }

    async joinEvent(id: string, userId: string): Promise<IGameEvent | null> {
        return this.gameEventModel
            .findByIdAndUpdate(
                id,
                { $addToSet: { participants: userId } },
                { new: true }
            )
            .populate('game')
            .populate('participants', 'name emailAddress')
            .exec();
    }

    async leaveEvent(id: string, userId: string): Promise<IGameEvent | null> {
        return this.gameEventModel
            .findByIdAndUpdate(
                id,
                { $pull: { participants: userId } },
                { new: true }
            )
            .populate('game')
            .populate('participants', 'name emailAddress')
            .exec();
    }
}
