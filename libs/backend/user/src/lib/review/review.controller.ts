import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards
} from '@nestjs/common';
import { IReview } from '@avans-nx-workshop/shared/api';
import {
    CreateReviewDto,
    UpdateReviewDto
} from '@avans-nx-workshop/backend/dto';
import { ReviewService } from './review.service';
import { ReviewExistGuard } from './review-exists.guard';

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
    create(@Body() createReviewDto: CreateReviewDto): Promise<IReview> {
        return this.reviewService.create(createReviewDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateReviewDto: UpdateReviewDto
    ): Promise<IReview | null> {
        return this.reviewService.update(id, updateReviewDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<IReview | null> {
        return this.reviewService.delete(id);
    }
}
