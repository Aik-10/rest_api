import { Request } from 'express';

export const handleVerifySignature = async (req: Request, secret: string): Promise<boolean> => {
    return req.headers['x-access-key'] === secret
}
