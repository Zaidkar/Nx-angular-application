import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IGame } from '@avans-nx-workshop/shared/api';
import {
    CreateGameDto,
    CreateReviewDto,
    UpdateGameDto,
    UpdateReviewDto
} from '@avans-nx-workshop/backend/dto';
import { Game, GameDocument } from './game.schema';
import { ReviewService } from '../review/review.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class GameService {
    private readonly logger: Logger = new Logger(GameService.name);
    constructor(
        @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>,
        private readonly reviewService: ReviewService
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
        try {
            const createdGame = new this.gameModel(createGameDto);
            return await createdGame.save();
        } catch (error) {
            if ((error as any).code === 11000) {
                this.logger.error(
                    `Duplicate game error: ${createGameDto.title}`
                );
                throw new ConflictException(
                    'A game with this title already exists.'
                );
            }
            this.logger.error(`Error creating game: ${(error as any).message}`);
            throw error;
        }
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
        reviewDto: UpdateReviewDto
    ): Promise<Game> {
        const updatedReview = await this.reviewService.update(
            reviewId,
            reviewDto
        );

        if (!updatedReview) {
            throw new Error(`Review with id ${reviewId} not found`);
        }

        const updatedGame = await this.gameModel
            .findByIdAndUpdate(
                gameId,
                { $set: { 'reviews.$[elem]': updatedReview } },
                {
                    new: true,
                    arrayFilters: [{ 'elem._id': new Types.ObjectId(reviewId) }]
                }
            )
            .exec();

        if (!updatedGame) {
            throw new Error(`Game with id ${gameId} not found`);
        }

        return updatedGame;
    }
}
