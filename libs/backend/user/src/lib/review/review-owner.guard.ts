import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReviewService } from './review.service';
import { Request } from 'express';
import { IUserIdentity, UserRole } from '@avans-nx-workshop/shared/api';

interface AuthenticatedRequest extends Request {
    user?: IUserIdentity;
}

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
    constructor(
        private readonly reviewService: ReviewService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();
        const user = request.user;
        const reviewId = request.params['id'];

        if (!user) throw new ForbiddenException('Not authenticated');

        const review = await this.reviewService.findOne(reviewId);
        if (!review) throw new ForbiddenException('Review not found');

        const isOwner = review.reviewer === user._id;
        const isAdmin =
            user.role?.toLowerCase() === UserRole.Admin.toLowerCase();

        if (isOwner || isAdmin) {
            return true;
        }

        throw new ForbiddenException(
            'You are not allowed to modify this review'
        );
    }
}
