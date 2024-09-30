"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gracefullyShutdown = void 0;
const gracefullyShutdown = async (error) => {
    console.error("UNEXPECTED_APP_ERROR", { error });
    process.exit(1);
};
exports.gracefullyShutdown = gracefullyShutdown;
//# sourceMappingURL=gracefullyShutdown.js.map