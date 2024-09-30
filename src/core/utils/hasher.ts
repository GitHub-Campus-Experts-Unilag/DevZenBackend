import * as bcrypt from "bcryptjs";

export class PasswordHelper {
  static hashData = async (data: string) => {
    return await bcrypt.hash(data, 10);
  };

  static compareHashedData = async (plain: string, hash: string) => {
    return await bcrypt.compare(plain, hash);
  };
}
