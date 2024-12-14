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
import { IGameEvent } from '@avans-nx-workshop/shared/api';
import {
    CreateGameEventDto,
    UpdateGameEventDto
} from '@avans-nx-workshop/backend/dto';
import { GameEventService } from './gameEvent.service';
import { GameEventExistGuard } from './gameEvent-exists.guard';

@Controller('game-event')
export class GameEventController {
    constructor(private readonly gameEventService: GameEventService) {}

    @Get()
    async findAll(): Promise<IGameEvent[]> {
        return this.gameEventService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGameEvent | null> {
        return this.gameEventService.findOne(id);
    }

    @Post()
    create(
        @Body() createGameEventDto: CreateGameEventDto
    ): Promise<IGameEvent> {
        return this.gameEventService.create(createGameEventDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateGameEventDto: UpdateGameEventDto
    ): Promise<IGameEvent | null> {
        return this.gameEventService.update(id, updateGameEventDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<IGameEvent | null> {
        return this.gameEventService.delete(id);
    }
}
