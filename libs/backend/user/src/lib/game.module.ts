import { Module } from '@nestjs/common';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game/game.schema';
import { ReviewModule } from './review.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
        ReviewModule
    ],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService]
})
export class GameModule {}
