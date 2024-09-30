export declare class HttpHelper {
    private headers;
    get: <T extends unknown = any>(url: string) => Promise<T | undefined>;
    post: <T extends unknown = any>(url: string) => Promise<T | undefined>;
    appendHeader: (key: string, value: string | any) => this;
    private makeRequest;
}
export declare const HttpClient: HttpHelper;
