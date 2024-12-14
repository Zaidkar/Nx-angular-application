import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';
import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';

@Module({
    imports: [
        Neo4jModule.forRoot({
            scheme: 'neo4j+s',
            host: 'd5e40bc7.databases.neo4j.io', //enviroment.RCMND_NEO4J_DB_HOST
            port: 7687, //enviroment.RCMND_NEO4J_DB_PORT
            username: process.env.NEO4J_USER, //enviroment.RCMND_NEO4J_DB_USER
            password: process.env.NEO4J_PASSWORD //enviroment.RCMND_NEO4J_DB_PASSWORD
        }),
        Neo4jBackendModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
