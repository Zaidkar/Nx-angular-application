import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewExistGuard implements CanActivate {
    constructor(
        @InjectModel('Review') private readonly userModel: Model<Review>
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().body;
        return !!this.userModel.findOne({ username: user.username });
    }
}
