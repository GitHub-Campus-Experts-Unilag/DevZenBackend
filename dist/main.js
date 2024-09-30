"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const core_1 = require("./core");
(0, core_1.initializeDbConnection)().then(app_1.startApp).catch(core_1.gracefullyShutdown);
//# sourceMappingURL=main.js.map