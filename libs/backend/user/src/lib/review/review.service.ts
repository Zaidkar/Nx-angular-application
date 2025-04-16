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

    async update(
        id: string,
        updateReviewDto: UpdateReviewDto
    ): Promise<IReview | null> {
        console.log('ReviewService: update method called for review id:', id);
        console.log('ReviewService: DTO received:', updateReviewDto);
        const updatedReview = await this.reviewModel
            .findByIdAndUpdate(id, updateReviewDto, { new: true })
            .exec();
        console.log('ReviewService: updated review:', updatedReview);
        return updatedReview;
    }

    async delete(id: string): Promise<IReview | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async create(reviewDto: CreateReviewDto): Promise<IReview> {
        const { ...data } = reviewDto;
        return this.reviewModel.create({
            ...data,
            postDate: reviewDto.postDate || new Date()
        });
    }
}
