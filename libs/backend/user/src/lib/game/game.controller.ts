import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Req
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { IGame, IReview, IUserIdentity } from '@avans-nx-workshop/shared/api';
import {
    CreateGameDto,
    UpdateGameDto,
    CreateReviewDto,
    UpdateReviewDto
} from '@avans-nx-workshop/backend/dto';
import { GameService } from './game.service';
import { GameExistGuard } from './game-exists.guard';
import { Game } from './game.schema';
import { Types } from 'mongoose';
import { Review } from '../review/review.schema';

interface AuthenticatedRequest extends ExpressRequest {
    user?: IUserIdentity;
}

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

    @Get()
    async findAll(): Promise<IGame[]> {
        console.log('Controller: findAllGames called');
        return this.gameService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGame | null> {
        console.log('Controller: findOneGame called. ID:', id);
        return this.gameService.findOne(id);
    }

    @Post('')
    @UseGuards(GameExistGuard)
    create(@Body() createGameDto: CreateGameDto): Promise<IGame> {
        return this.gameService.create(createGameDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateGameDto: UpdateGameDto
    ): Promise<IGame | null> {
        return this.gameService.update(id, updateGameDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<IGame | null> {
        return this.gameService.delete(id);
    }

    @Post(':id/reviews')
    async addReview(@Param('id') id: string, @Body() review: CreateReviewDto) {
        console.log('Controller: addReview called. ID:', id);
        return this.gameService.addReview(id, review);
    }

    @Delete(':id/reviews/:reviewId')
    async deleteReview(
        @Param('id') id: string,
        @Param('reviewId') reviewId: string
    ): Promise<Game | null> {
        console.log('Controller: deleteReview called. ID:', id);
        return this.gameService.removeReview(id, reviewId);
    }

    @Put(':id/reviews/:reviewId')
    async updateReview(
        @Param('id') gameId: string,
        @Param('reviewId') reviewId: string,
        @Body() review: any
    ): Promise<Game | null> {
        const { _id, ...updateFields } = review;
        console.log(
            'Controller: updateReview called. Update payload:',
            updateFields
        );
        return this.gameService.updateReview(gameId, reviewId, updateFields);
    }
}
