export declare const config: Readonly<{
    app: {
        port: number;
        environment: {
            mode: string | undefined;
            isInProduction: boolean;
            isInDevelopment: boolean;
            isInTesting: boolean;
        };
        encryption: {
            key: string;
        };
    };
    mail: {
        apiKey: string;
        domain: string;
        globalFrom: string | undefined;
        smtpHost: string;
        smtpPort: number;
        smtpUsername: string | undefined;
        smtpClientId: string;
        smtpClientSecret: string;
        smtpRefreshToken: string;
    };
    auth: {
        accessTokenSecret: string;
        accessTokenExpiresIn: string;
        refreshTokenSecret: string;
        refreshTokenExpiresIn: string;
    };
    cache: {
        port: number;
        host: string | undefined;
        ttl: number;
    };
    db: {
        mongodb: {
            MONGO_URL: string;
        };
        postgresql: {
            POSTGRESQL_USER: string;
            POSTGRESQL_USER_PASSWORD: string;
            POSTGRESQL_DATABASE: string;
            POSTGRESQL_PORT: number;
        };
    };
    rateLimit: {
        limit: string | undefined;
    };
}>;
export default config;
