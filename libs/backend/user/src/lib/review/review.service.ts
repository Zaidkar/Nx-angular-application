import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReview } from '@avans-nx-workshop/shared/api';
import {
    CreateReviewDto,
    UpdateReviewDto
} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private readonly reviewModel: Model<IReview>
    ) {}

    async findAll(): Promise<IReview[]> {
        return this.reviewModel.find().exec();
    }

    async findOne(id: string): Promise<IReview | null> {
        return this.reviewModel.findById(id).exec();
    }

    async create(review: CreateReviewDto): Promise<IReview> {
        const createdReview = this.reviewModel.create(review);
        return createdReview;
    }

    async update(
        id: string,
        updateReviewDto: UpdateReviewDto
    ): Promise<IReview | null> {
        return this.reviewModel
            .findByIdAndUpdate(id, updateReviewDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<IReview | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }
}
