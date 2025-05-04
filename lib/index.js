import "./chunk-QNDLJ2W7.js";
import {
  LucidResource
} from "./chunk-7OLKFT6G.js";
import {
  __name
} from "./chunk-H736K5TN.js";

// stubs/main.ts
import { getDirname } from "@poppinss/utils";
var stubsRoot = getDirname(import.meta.url);

// configure.ts
async function configure(command) {
  const codemods = await command.createCodemods();
  await codemods.makeUsingStub(stubsRoot, "config/adminjs.stub", {});
  await codemods.makeUsingStub(stubsRoot, "config/component_loader.stub", {});
  await codemods.makeUsingStub(stubsRoot, "config/auth.stub", {});
  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider("@adminjs/adonis/adminjs_provider", [
      "web"
    ]);
  });
}
__name(configure, "configure");
export {
  LucidResource,
  configure,
  stubsRoot
};
//# sourceMappingURL=index.js.map