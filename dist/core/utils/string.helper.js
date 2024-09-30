"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringHelper = void 0;
class StringHelper {
    static generatePersonalizedHtmlFromTemplateAndValues(template, values) {
        return template.replace(/\[\[(\w+)]]/g, (match, placeHolder) => {
            return values[placeHolder] || match;
        });
    }
    static generateObjectFromColumnsAndInfo({ info, columns, }) {
        let object = {};
        columns.forEach((column, index) => {
            object[column] = info[index];
        });
        return object;
    }
}
exports.StringHelper = StringHelper;
//# sourceMappingURL=string.helper.js.map