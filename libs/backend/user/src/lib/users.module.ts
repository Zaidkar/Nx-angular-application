import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { Game, GameSchema } from './game/game.schema';
// import { Meal, MealSchema } from '@avans-nx-workshop/backend/features';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Game.name, schema: GameSchema }
            // { name: Meal.name, schema: MealSchema },
        ])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}
