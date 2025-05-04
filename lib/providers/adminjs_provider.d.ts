import { ApplicationService } from '@adonisjs/core/types';
export default class AdminJSProvider {
    protected app: ApplicationService;
    constructor(app: ApplicationService);
    register(): void;
    boot(): Promise<void>;
    start(): Promise<void>;
    ready(): Promise<void>;
    shutdown(): Promise<void>;
}
