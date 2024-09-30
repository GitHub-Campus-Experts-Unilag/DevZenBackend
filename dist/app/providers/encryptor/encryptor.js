"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryptor = void 0;
const crypto = require("node:crypto");
const core_1 = require("../../../core");
const encryption_algorithm_1 = require("./encryption.algorithm");
class Encryptor {
    constructor() {
        this._algorithm = encryption_algorithm_1.EncryptionAlgorithm.AES_256_CBC;
        this._key = core_1.config.app.encryption.key;
        this._iv = crypto.randomBytes(16);
    }
    decrypt(encryptedText, key) {
        try {
            if (!key) {
                key = this._key;
            }
            const textParts = encryptedText.split(":");
            const iv = Buffer.from(textParts.shift(), "hex");
            const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");
            const decipher = crypto.createDecipheriv(this._algorithm, key, iv);
            const decryptedText = Buffer.concat([
                decipher.update(encryptedTextBuffer),
                decipher.final(),
            ]);
            return decryptedText.toString();
        }
        catch (err) {
            return "";
        }
    }
    encrypt(plainText, key) {
        if (!key) {
            key = this._key;
        }
        const cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv);
        const encryptedText = Buffer.concat([
            cipher.update(plainText),
            cipher.final(),
        ]);
        return `${this._iv.toString("hex")}:${encryptedText.toString("hex")}`;
    }
}
exports.Encryptor = Encryptor;
//# sourceMappingURL=encryptor.js.map