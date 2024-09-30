import { Request } from "express";
import { ContextTypes, RequestFileContents } from "../types";

class ParseContextArgs {
  parse = (req: Request) => {
    return {
      input: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      user: req.user,
      file: ParseContextArgs.parseFileContents(req),
    };
  };

  private static parseFileContents = (req: Request): RequestFileContents => {
    return {
      fileName: req?.file?.originalname,
      fieldName: req?.file?.fieldname,
      bufferContents: req?.file?.buffer,
      originalFileName: req?.file?.originalname,
      mimetype: req?.file?.mimetype,
      fileSize: req?.file?.size,
      path: req?.file?.path,
      fileStream: req?.file?.stream!,
      
    };
  };
}

export default new ParseContextArgs();
