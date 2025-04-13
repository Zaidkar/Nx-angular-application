import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IGame, IReview } from '@avans-nx-workshop/shared/api';
import {
    CreateGameDto,
    CreateReviewDto,
    UpdateGameDto
} from '@avans-nx-workshop/backend/dto';
import { Game, GameDocument } from './game.schema';
import { Observable } from 'rxjs';

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>
    ) {}

    async findAll(): Promise<Game[]> {
        return this.gameModel.find().exec();
    }

    async findOne(id: string): Promise<Game | null> {
        return this.gameModel
            .findById(id)
            .populate('reviews.reviewer', 'name emailAddress profileImgUrl')
            .exec();
    }
    async create(createGameDto: CreateGameDto): Promise<Game> {
        const createdGame = new this.gameModel(createGameDto);
        return createdGame.save();
    }

    async update(
        id: string,
        updateGameDto: UpdateGameDto
    ): Promise<Game | null> {
        return this.gameModel
            .findByIdAndUpdate(id, updateGameDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Game | null> {
        return this.gameModel.findByIdAndDelete(id).exec();
    }

    async addReview(gameId: string, review: CreateReviewDto): Promise<Game> {
        const generatedReview = {
            ...review,
            _id: new Types.ObjectId()
        };

        const updatedGame = await this.gameModel
            .findByIdAndUpdate(
                gameId,
                { $push: { reviews: generatedReview } },
                { new: true, runValidators: true }
            )
            .exec();

        if (!updatedGame) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        return updatedGame;
    }

    async removeReview(gameId: string, reviewId: string): Promise<Game> {
        const updatedGame = await this.gameModel
            .findByIdAndUpdate(
                gameId,
                { $pull: { reviews: { _id: reviewId } } },
                { new: true }
            )
            .exec();

        if (!updatedGame) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        return updatedGame;
    }
}
