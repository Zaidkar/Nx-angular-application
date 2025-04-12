import { Module } from '@nestjs/common';
import { GameEventController } from './gameEvent/gameEvent.controller';
import { GameEventService } from './gameEvent/gameEvent.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameEvent, GameEventSchema } from './gameEvent/gameEvent.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: GameEvent.name, schema: GameEventSchema }
        ])
    ],
    controllers: [GameEventController],
    providers: [GameEventService],
    exports: [GameEventService]
})
export class GameEventModule {}
