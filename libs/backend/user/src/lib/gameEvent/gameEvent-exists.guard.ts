import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameEvent } from './gameEvent.schema';
import { Observable } from 'rxjs';

@Injectable()
export class GameEventExistGuard implements CanActivate {
    constructor(
        @InjectModel('GameEvent') private readonly userModel: Model<GameEvent>
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().body;
        return !!this.userModel.findOne({ username: user.username });
    }
}
