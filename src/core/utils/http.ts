import fetch from "axios";
import { UnProcessableError } from "../errors";
import { logger } from "../logging";
import { HttpStatus } from "./statusCodes";

export class HttpHelper {
  private headers: Record<string, any> = {};

  get = async <T extends string | any = any>(url: string) => {
    return this.makeRequest<T>(url, "GET");
  };

  post = async <T extends string | any = any>(url: string) => {
    return this.makeRequest<T>(url, "POST");
  };

  appendHeader = (key: string, value: string | any) => {
    this.headers[key] = value;
    return this;
  };

  private makeRequest = async <T extends string | any = any>(
    url: string,
    method: "POST" | "GET",
  ) => {
    try {
      const response = await fetch<T>(url, {
        method,
        headers: {
          ...this.headers,
        },
      });

      if (response.status === HttpStatus.OK) return response.data;
    } catch (err: unknown) {
      logger.error(err);
      throw new UnProcessableError("Error performing request");
    }
  };
}

export const HttpClient = new HttpHelper();
