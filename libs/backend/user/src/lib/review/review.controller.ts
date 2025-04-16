import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Request
} from '@nestjs/common';
import { IReview, IUserIdentity } from '@avans-nx-workshop/shared/api';
import {
    CreateReviewDto,
    UpdateReviewDto
} from '@avans-nx-workshop/backend/dto';
import { ReviewService } from './review.service';
import { ReviewExistGuard } from './review-exists.guard';
import { ReviewOwnerGuard } from './review-owner.guard';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
    user?: IUserIdentity;
}

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

    @Get()
    async findAll(): Promise<IReview[]> {
        return this.reviewService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IReview | null> {
        return this.reviewService.findOne(id);
    }

    @Post('')
    @UseGuards(ReviewExistGuard)
    create(
        @Body() createReviewDto: CreateReviewDto,
        @Request() req: AuthenticatedRequest
    ): Promise<IReview> {
        const user = req.user!;
        console.log(user._id);
        return this.reviewService.create({
            ...createReviewDto,
            reviewer: user._id,
            postDate: new Date()
        });
    }

    @Put(':id')
    @UseGuards(ReviewOwnerGuard)
    update(
        @Param('id') id: string,
        @Body() updateReviewDto: UpdateReviewDto
    ): Promise<IReview | null> {
        console.log('ReviewController: update method called with id:', id);
        console.log('ReviewController: update payload:', updateReviewDto);
        return this.reviewService.update(id, updateReviewDto);
    }

    @Delete(':id')
    @UseGuards(ReviewOwnerGuard)
    delete(@Param('id') id: string): Promise<IReview | null> {
        return this.reviewService.delete(id);
    }
}
