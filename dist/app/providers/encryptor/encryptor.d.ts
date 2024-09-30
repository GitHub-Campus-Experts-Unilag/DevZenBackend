import { IEncryptor } from "./encryptor.interface";
export declare class Encryptor implements IEncryptor {
    private readonly _algorithm;
    private readonly _key;
    private readonly _iv;
    decrypt(encryptedText: string, key?: string): string;
    encrypt(plainText: string, key?: string): string;
}
