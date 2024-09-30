/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from "mongoose";
import { IModel } from "../../common";
export interface IBlacklistToken extends IModel {
    token: string;
    expiry: Date;
}
export declare const blacklistTokenSchema: Schema<IBlacklistToken, import("mongoose").Model<IBlacklistToken, any, any, any, import("mongoose").Document<unknown, any, IBlacklistToken> & IBlacklistToken & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IBlacklistToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IBlacklistToken>> & import("mongoose").FlatRecord<IBlacklistToken> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const BlackListTokens: import("mongoose").Model<IBlacklistToken, {}, {}, {}, import("mongoose").Document<unknown, {}, IBlacklistToken> & IBlacklistToken & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<IBlacklistToken, import("mongoose").Model<IBlacklistToken, any, any, any, import("mongoose").Document<unknown, any, IBlacklistToken> & IBlacklistToken & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IBlacklistToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IBlacklistToken>> & import("mongoose").FlatRecord<IBlacklistToken> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
export type BlackListRepository = typeof BlackListTokens;
