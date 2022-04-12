declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_NAME: string;
            DB_LOGIN: string;
            DB_PASSWORD: string;
            DB_DIALECT: string;
            DB_HOST: string;
        }
    }
}

export {}