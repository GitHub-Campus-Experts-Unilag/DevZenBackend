export interface IEncryptor {
  decrypt(inputText: string, key?: string): string;
  encrypt(inputText: string, key?: string): string;
}
