import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review/review.schema';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule {}
