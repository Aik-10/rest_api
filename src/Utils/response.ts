export enum ResponseStatus {
    Success = 'success',
    Fail = 'fail',
    Error = 'error',
}

type ResponseStatusKey = keyof typeof ResponseStatus;
type ResponseStatusValue = typeof ResponseStatus[ResponseStatusKey];

type Response<T = unknown> = {
    responseCode: number;
} & ({
    status: ResponseStatus.Error;
    message: string;
} | {
    status: Omit<ResponseStatus, ResponseStatus.Error>;
    data?: T;
})

export function generateApiResponse(responseCode: number, status: ResponseStatus, data?: unknown): Response {
    try {
        if (status === ResponseStatus.Error) {
            return {
                responseCode,
                status,
                message: data && typeof data === 'string' ? data : 'Error message not provided.',
            };
        }

        if (status === ResponseStatus.Success) {
            return {
                responseCode,
                status,
                data,
            };
        }

        return {
            responseCode,
            status,
            data:
                data && typeof data === 'object' && !Array.isArray(data)
                    ? (data as Record<string, string>)
                    : { error: 'Error details not provided.' },
        };

    } catch (err: any) {
        throw new Error('Error generating API response.');
    }
}
