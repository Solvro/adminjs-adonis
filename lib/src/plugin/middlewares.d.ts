import { HttpContext } from '@adonisjs/core/http';
import { NextFn } from '@adonisjs/core/types/http';
export declare const checkSession: (loginPath: string) => (ctx: HttpContext, next: NextFn) => Promise<any>;
