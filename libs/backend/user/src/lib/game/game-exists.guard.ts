import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { Observable } from 'rxjs';

@Injectable()
export class GameExistGuard implements CanActivate {
    constructor(@InjectModel('Game') private readonly userModel: Model<Game>) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().body;
        return !!this.userModel.findOne({ username: user.username });
    }
}
