// game.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IGame } from '@avans-nx-workshop/shared/api';
import {
    CreateGameDto,
    CreateReviewDto,
    UpdateGameDto
} from '@avans-nx-workshop/backend/dto';
import { Game, GameDocument } from './game.schema';
import { ReviewService } from '../review/review.service'; // adjust the path as necessary

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>,
        private readonly reviewService: ReviewService // Inject the ReviewService
    ) {}

    async findAll(): Promise<Game[]> {
        return this.gameModel.find().exec();
    }

    async findOne(id: string): Promise<Game | null> {
        return (
            this.gameModel
                .findById(id)
                // When reviews are fully embedded, populate might not be necessary unless you want to resolve nested refs.
                .populate('reviews.reviewer', 'name emailAddress profileImgUrl')
                .exec()
        );
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

    async addReview(gameId: string, reviewDto: CreateReviewDto): Promise<Game> {
        const createdReview = await this.reviewService.create({
            ...reviewDto,
            postDate: new Date()
        });

        const updatedGame = await this.gameModel
            .findByIdAndUpdate(
                gameId,
                { $push: { reviews: createdReview['toObject']() } },
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

    async updateReview(
        gameId: string,
        reviewId: string,
        reviewDto: CreateReviewDto
    ): Promise<Game> {
        const updatedGame = await this.gameModel
            .findOneAndUpdate(
                { _id: gameId, 'reviews._id': reviewId },
                { $set: { 'reviews.$': reviewDto } },
                { new: true }
            )
            .exec();

        if (!updatedGame) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        return updatedGame;
    }
}
