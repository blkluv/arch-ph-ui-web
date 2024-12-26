// apiClient.ts
export interface ApiRequestOptions extends RequestInit {
    headers?: Record<string, string>;
    body?: string;
}

export async function apiRequest<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    try {
        const clinicId = sessionStorage.getItem("clinic-id");
        const defaultHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        const mergedOptions: ApiRequestOptions = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
                ...(clinicId && { 'X-Clinic-Id': clinicId })
            },
        };

        const response = await fetch(url, mergedOptions);

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(
                `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
            );
        }

        return (await response.json()) as T;
    } catch (error) {
        //console.error('API Request Error:', (error as Error).message);
        throw error;
    }
}
