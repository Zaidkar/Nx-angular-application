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

@Controller('game-events')
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
    @UseGuards(GameEventExistGuard)
    create(
        @Body() createGameEventDto: CreateGameEventDto
    ): Promise<IGameEvent> {
        return this.gameEventService.create(createGameEventDto);
    }

    @Put(':id')
    @UseGuards(GameEventExistGuard)
    update(
        @Param('id') id: string,
        @Body() updateGameEventDto: UpdateGameEventDto
    ): Promise<IGameEvent | null> {
        return this.gameEventService.update(id, updateGameEventDto);
    }

    @Delete(':id')
    @UseGuards(GameEventExistGuard)
    delete(@Param('id') id: string): Promise<IGameEvent | null> {
        return this.gameEventService.delete(id);
    }

    @Post(':id/join')
    joinEvent(
        @Param('id') id: string,
        @Body('userId') userId: string
    ): Promise<IGameEvent | null> {
        return this.gameEventService.joinEvent(id, userId);
    }

    @Post(':id/leave')
    leaveEvent(
        @Param('id') id: string,
        @Body('userId') userId: string
    ): Promise<IGameEvent | null> {
        return this.gameEventService.leaveEvent(id, userId);
    }
}
