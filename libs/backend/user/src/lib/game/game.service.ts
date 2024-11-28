import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGame } from '@avans-nx-workshop/shared/api';
import { CreateGameDto, UpdateGameDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class GameService {
    constructor(
        @InjectModel('Game') private readonly gameModel: Model<IGame>
    ) {}

    async findAll(): Promise<IGame[]> {
        return this.gameModel.find().exec();
    }

    async findOne(id: string): Promise<IGame | null> {
        return this.gameModel.findById(id).exec();
    }

    async create(createGameDto: CreateGameDto): Promise<IGame> {
        const createdGame = new this.gameModel(createGameDto);
        return createdGame.save();
    }

    async update(
        id: string,
        updateGameDto: UpdateGameDto
    ): Promise<IGame | null> {
        return this.gameModel
            .findByIdAndUpdate(id, updateGameDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<IGame | null> {
        return this.gameModel.findByIdAndDelete(id).exec();
    }
}
