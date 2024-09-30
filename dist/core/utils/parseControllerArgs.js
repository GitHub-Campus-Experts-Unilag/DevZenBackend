"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseContextArgs {
    constructor() {
        this.parse = (req) => {
            return {
                input: req.body,
                params: req.params,
                query: req.query,
                headers: req.headers,
                user: req.user,
                file: ParseContextArgs.parseFileContents(req),
            };
        };
    }
}
ParseContextArgs.parseFileContents = (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        fileName: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname,
        fieldName: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.fieldname,
        bufferContents: (_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.buffer,
        originalFileName: (_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.originalname,
        mimetype: (_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.mimetype,
        fileSize: (_f = req === null || req === void 0 ? void 0 : req.file) === null || _f === void 0 ? void 0 : _f.size,
        path: (_g = req === null || req === void 0 ? void 0 : req.file) === null || _g === void 0 ? void 0 : _g.path,
        fileStream: (_h = req === null || req === void 0 ? void 0 : req.file) === null || _h === void 0 ? void 0 : _h.stream,
    };
};
exports.default = new ParseContextArgs();
//# sourceMappingURL=parseControllerArgs.js.map