"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.HttpHelper = void 0;
const axios_1 = require("axios");
const errors_1 = require("../errors");
const logging_1 = require("../logging");
const statusCodes_1 = require("./statusCodes");
class HttpHelper {
    constructor() {
        this.headers = {};
        this.get = async (url) => {
            return this.makeRequest(url, "GET");
        };
        this.post = async (url) => {
            return this.makeRequest(url, "POST");
        };
        this.appendHeader = (key, value) => {
            this.headers[key] = value;
            return this;
        };
        this.makeRequest = async (url, method) => {
            try {
                const response = await (0, axios_1.default)(url, {
                    method,
                    headers: Object.assign({}, this.headers),
                });
                if (response.status === statusCodes_1.HttpStatus.OK)
                    return response.data;
            }
            catch (err) {
                logging_1.logger.error(err);
                throw new errors_1.UnProcessableError("Error performing request");
            }
        };
    }
}
exports.HttpHelper = HttpHelper;
exports.HttpClient = new HttpHelper();
//# sourceMappingURL=http.js.map