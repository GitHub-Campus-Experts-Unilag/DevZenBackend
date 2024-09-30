"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
const core_1 = require("../../core");
const common_1 = require("../../common");
class SignUp {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
        this.handle = async ({ input }) => {
            const { email, password } = input;
            const userExist = await this.usersRepo.findOne({ email: email });
            if (userExist) {
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.EMAIL_EXISTS);
            }
            input.password = await core_1.PasswordHelper.hashData(password);
            const createdUser = await this.usersRepo.create(input);
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.SIGNUP,
                data: createdUser,
            };
        };
    }
}
exports.SignUp = SignUp;
//# sourceMappingURL=sign.up.js.map