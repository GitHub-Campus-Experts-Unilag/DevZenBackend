export declare class PasswordHelper {
    static hashData: (data: string) => Promise<string>;
    static compareHashedData: (plain: string, hash: string) => Promise<boolean>;
}
