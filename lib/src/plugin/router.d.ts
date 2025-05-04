import { HttpContext } from '@adonisjs/core/http';
import AdminJS, { BaseAuthProvider, RouterType } from 'adminjs';
import { SessionData } from '@adonisjs/session/types';
import { AdminJSProviderConfig, SessionI } from '../types.js';
declare module '@adonisjs/core/http' {
    interface HttpContext {
        session: SessionI & SessionData;
    }
}
export default class AdminJSRouter {
    protected admin: AdminJS;
    private groupPrefix;
    constructor(admin: AdminJS);
    buildRouter(config: AdminJSProviderConfig): this;
    buildAuthenticatedRouter(config: AdminJSProviderConfig): this;
    protected assetHandler(asset: RouterType['assets'][number]): ({ response }: HttpContext) => void;
    protected routeHandler(route: RouterType['routes'][number]): ({ session, request, params, response }: HttpContext) => Promise<void>;
    protected loginViewHandler(provider: BaseAuthProvider): ({ response }: HttpContext) => Promise<void>;
    protected loginFormHandler(provider: BaseAuthProvider): (ctx: HttpContext) => Promise<void>;
    protected logoutHandler(provider: BaseAuthProvider): ({ request, response, session }: HttpContext) => Promise<void>;
}
