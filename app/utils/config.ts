// src/utils/config.ts

// Get the base URL dynamically from environment variables
export const getBaseUrl = (): string => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!BASE_URL) {
        throw new Error("API base URL is not defined in the environment configuration.");
    }

    return BASE_URL;
};
