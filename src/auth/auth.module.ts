import { Users } from "../users";
import { CurrentUser } from "./middlewares/current.user";
import { TokenService } from "./helpers";
import { SignIn } from "./services/sign.in";
import { SignUp } from "./services/sign.up";
import { Logout } from "./services/logout";
import { BlackListTokens } from "./model/blacklistoken";
import { Encryptor } from "../app/providers/encryptor/encryptor";

const encryptor = new Encryptor();
export const tokenService = new TokenService(encryptor);
export const currentUser = new CurrentUser(tokenService, encryptor);

export const signIn = new SignIn(Users, tokenService);
export const signUp = new SignUp(Users)
export const signOut = new Logout(tokenService, Users, BlackListTokens);
