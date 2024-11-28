import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING:
        'mongodb+srv://nx:nxpassword@nx-applicatie.vs6sa.mongodb.net/nx-angular?retryWrites=true&w=majority&appName=Nx-angular'
};
