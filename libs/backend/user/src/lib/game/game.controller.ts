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
import { IGame } from '@avans-nx-workshop/shared/api';
import { CreateGameDto, UpdateGameDto } from '@avans-nx-workshop/backend/dto';
import { GameService } from './game.service';
import { GameExistGuard } from './game-exists.guard';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

    @Get()
    async findAll(): Promise<IGame[]> {
        return this.gameService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGame | null> {
        return this.gameService.findOne(id);
    }

    @Post('')
    @UseGuards(GameExistGuard)
    create(@Body() createGameDto: CreateGameDto): Promise<IGame> {
        return this.gameService.create(createGameDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateGameDto: UpdateGameDto
    ): Promise<IGame | null> {
        return this.gameService.update(id, updateGameDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<IGame | null> {
        return this.gameService.delete(id);
    }
}
