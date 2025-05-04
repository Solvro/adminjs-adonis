import {
  AdminJSRouter
} from "../chunk-7R3XZVIM.js";
import {
  Database
} from "../chunk-2LZF7UDA.js";
import {
  resource_default
} from "../chunk-DLTI4MYK.js";
import "../chunk-ZH2NDCB4.js";
import "../chunk-LCXDWJPC.js";
import {
  __name
} from "../chunk-H736K5TN.js";

// providers/adminjs_provider.ts
import AdminJS from "adminjs";
import SchemaInspector from "knex-schema-inspector";
import db from "@adonisjs/lucid/services/db";
import { RuntimeException } from "@adonisjs/core/exceptions";
var AdminJSProvider = class {
  static {
    __name(this, "AdminJSProvider");
  }
  app;
  constructor(app) {
    this.app = app;
  }
  register() {
    this.app.container.singleton(AdminJS, async (resolver) => {
      const configService = await resolver.make("config");
      const adminConfig = configService.get("adminjs");
      const options = adminConfig.adminjs ?? {};
      if (adminConfig.adapter.enabled) {
        for (const resource of adminConfig.adminjs.resources ?? []) {
          const knexInstance = db.connection(resource.connectionName).getReadClient();
          if (!knexInstance) {
            throw new RuntimeException("Could not load Knex instance to fetch database schema.");
          }
          const inspector = SchemaInspector.default(knexInstance);
          const actualResource = resource.resource ?? resource;
          await actualResource.assignMetadata(inspector);
        }
        AdminJS.registerAdapter({
          Resource: resource_default,
          Database
        });
      }
      const admin = new AdminJS(options);
      return admin;
    });
    this.app.container.singleton(AdminJSRouter, async (resolver) => {
      const admin = await resolver.make(AdminJS);
      return new AdminJSRouter(admin);
    });
  }
  async boot() {
  }
  async start() {
    const configService = await this.app.container.make("config");
    const config = configService.get("adminjs");
    const router = await this.app.container.make(AdminJSRouter);
    if (config.auth.enabled) {
      router.buildAuthenticatedRouter(config);
    } else {
      router.buildRouter(config);
    }
    const admin = await this.app.container.make(AdminJS);
    if (process.env.ADMIN_JS_SKIP_BUNDLE === "true")
      return;
    if (process.env.NODE_ENV === "production") {
      await admin.initialize();
    } else {
      admin.watch();
    }
  }
  async ready() {
  }
  async shutdown() {
  }
};
export {
  AdminJSProvider as default
};
//# sourceMappingURL=adminjs_provider.js.map