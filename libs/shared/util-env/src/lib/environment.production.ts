import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://nxworkshop.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING:
        'mongodb+srv://nx:nxpassword@nx-applicatie.vs6sa.mongodb.net/nx-angular?retryWrites=true&w=majority&appName=Nx-angular'
};
