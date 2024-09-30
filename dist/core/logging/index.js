"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logs_1 = require("./logs");
exports.logger = process.env.NODE_ENV === "production" ? (0, logs_1.prodDevLogger)() : (0, logs_1.buildDevLogger)();
//# sourceMappingURL=index.js.map