import { Router, Request, Response } from 'express';
import { ActiveEvents } from '~/Utils/ActiveEvents';
import { logger } from '~/Utils/logger';
import { ResponseStatus, generateApiResponse } from '~/Utils/response';

const router = Router();

router.post('/EventHandler/:event/:source?', async (req: Request, res: Response): Promise<T> => {
    const event = req.params.event;
    const source: number | null = Number(req.params.source) ?? null;
    const args: Array<string> | undefined = req.query.arg as Array<string>;

    try {
        if (!event) {
            throw new Error(`Invalid event: ${event}`);
        }

        if (!ActiveEvents[event]) {
            throw new Error('Invalid Event');
        }

        const responseMessage = args ? ActiveEvents[event]?.(source, ...args) : ActiveEvents[event]?.(source) ?? `Event ${event} Triggered`;
        const response = generateApiResponse(200, ResponseStatus.Success, responseMessage);

        logger.info(`New request "${event}" triggered with ${req.socket.remoteAddress}. Response: ${responseMessage}`);

        res.status(response.responseCode).send(response);
    } catch (e: any) {
        const response = generateApiResponse(400, ResponseStatus.Error, 'Invalid Event.');
        res.status(response.responseCode).send(response);

        logger.error(`an error occurred while handling event ${event}`);
    }
});

export = router;
