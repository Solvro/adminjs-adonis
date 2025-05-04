import {
  __name
} from "./chunk-H736K5TN.js";

// src/plugin/router.ts
import path from "node:path";
import router from "@adonisjs/core/services/router";
import { Router as AdminRouter } from "adminjs";

// src/plugin/middlewares.ts
var checkSession = /* @__PURE__ */ __name((loginPath) => {
  return async (ctx, next) => {
    if (!ctx.session || !ctx.session.get("adminUser")) {
      return ctx.response.redirect(loginPath);
    }
    return next();
  };
}, "checkSession");

// src/plugin/utils/path_utils.ts
var parsePathParams = /* @__PURE__ */ __name((routePath) => routePath.replace(/\{/g, ":").replace(/\}/g, ""), "parsePathParams");
var normalizePath = /* @__PURE__ */ __name((adminPath, rootPath) => {
  const strippedRootPath = adminPath.replace(rootPath, "");
  return strippedRootPath;
}, "normalizePath");

// src/plugin/router.ts
var AdminJSRouter = class {
  static {
    __name(this, "AdminJSRouter");
  }
  admin;
  groupPrefix;
  constructor(admin) {
    this.admin = admin;
    this.groupPrefix = admin.options.rootPath.startsWith("/") ? admin.options.rootPath.slice(1) : admin.options.rootPath;
  }
  buildRouter(config) {
    const { routes, assets } = AdminRouter;
    router.group(() => {
      assets.forEach((asset) => {
        router.get(asset.path, this.assetHandler(asset));
      });
      routes.forEach((route) => {
        const parsedPath = parsePathParams(route.path);
        router[route.method.toLowerCase()](parsedPath, this.routeHandler(route));
      });
    }).prefix(this.groupPrefix).middleware(config.middlewares ?? []);
    return this;
  }
  buildAuthenticatedRouter(config) {
    const { routes, assets } = AdminRouter;
    const bundleComponentsRoute = routes.find((r) => r.action === "bundleComponents");
    const authRoutes = routes.filter((r) => r.action !== "bundleComponents");
    this.admin.options.env = {
      ...this.admin.options.env ?? {},
      ...config.auth.provider.getUiProps()
    };
    router.group(() => {
      assets.forEach((asset) => {
        router.get(asset.path, this.assetHandler(asset));
      });
      if (bundleComponentsRoute) {
        router.get(parsePathParams(bundleComponentsRoute.path), this.routeHandler(bundleComponentsRoute));
      }
      router.get(normalizePath(this.admin.options.loginPath, this.admin.options.rootPath), this.loginViewHandler(config.auth.provider));
      router.post(normalizePath(this.admin.options.loginPath, this.admin.options.rootPath), this.loginFormHandler(config.auth.provider));
      router.get(normalizePath(this.admin.options.logoutPath, this.admin.options.rootPath), this.logoutHandler(config.auth.provider));
    }).prefix(this.groupPrefix).middleware(config.middlewares ?? []);
    router.group(() => {
      authRoutes.forEach((route) => {
        const parsedPath = parsePathParams(route.path);
        router[route.method.toLowerCase()](parsedPath, this.routeHandler(route));
      });
    }).prefix(this.groupPrefix).middleware([
      checkSession(this.admin.options.loginPath),
      ...config.auth.middlewares ?? []
    ]);
    return this;
  }
  assetHandler(asset) {
    return ({ response }) => {
      return response.download(path.resolve(asset.src));
    };
  }
  routeHandler(route) {
    return async ({ session, request, params, response }) => {
      const controller = new route.Controller({
        admin: this.admin
      }, session?.get("adminUser"));
      const parsedRequest = {
        ...request,
        params,
        query: request.qs(),
        payload: {
          ...request.body(),
          ...request.allFiles()
        },
        method: request.method().toLowerCase()
      };
      const handledRoute = await controller[route.action](parsedRequest, response);
      if (route.contentType) {
        response.header("Content-Type", route.contentType);
      }
      return response.send(handledRoute);
    };
  }
  loginViewHandler(provider) {
    const baseProps = {
      action: this.admin.options.loginPath,
      errorMessage: null
    };
    return async ({ response }) => {
      const login = await this.admin.renderLogin({
        ...baseProps,
        ...provider.getUiProps() ?? {}
      });
      return response.send(login);
    };
  }
  loginFormHandler(provider) {
    return async (ctx) => {
      const { request, response, params, session } = ctx;
      const adminUser = await provider.handleLogin({
        headers: request.headers(),
        query: request.qs(),
        params,
        data: request.body()
      }, ctx);
      if (adminUser) {
        session?.put("adminUser", adminUser);
        const redirectTo = session?.get("redirectTo");
        await session?.commit();
        if (redirectTo) {
          return response.redirect(redirectTo);
        }
        return response.redirect(this.admin.options.rootPath);
      }
      const login = await this.admin.renderLogin({
        action: this.admin.options.loginPath,
        errorMessage: "invalidCredentials",
        ...provider.getUiProps()
      });
      return response.send(login);
    };
  }
  logoutHandler(provider) {
    return async ({ request, response, session }) => {
      await provider.handleLogout({
        req: request,
        res: response
      });
      session?.forget("adminUser");
      await session?.commit();
      return response.redirect(this.admin.options.loginPath);
    };
  }
};

export {
  AdminJSRouter
};
//# sourceMappingURL=chunk-7R3XZVIM.js.map