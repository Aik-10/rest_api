import { Router, Request, Response } from 'express';
import { ActiveGETEvents, ActiveEvents } from '~/Utils/ActiveEvents';
import { logger } from '~/Utils/logger';
import { ResponseStatus, generateApiResponse } from '~/Utils/response';

const router = Router();

router.get('/GetEvent/:event', async (req: Request, res: Response): Promise<T> => {
    const event = req.params.event;
    const args: Array<string> | undefined = req.query.arg as Array<string>;

    try {
        if (!event) {
            throw new Error(`Invalid event: ${event}`);
        }

        if (!ActiveGETEvents[event]) {
            throw new Error('Invalid Event');
        }

        const responseMessage = args ? await ActiveGETEvents[event]?.(...args) : await ActiveGETEvents[event]?.();
        const response = generateApiResponse(200, ResponseStatus.Success, responseMessage);

        logger.info(`New GET request "${event}" triggered with ${req.socket.remoteAddress}. Response: ${JSON.stringify(responseMessage)}`);

        res.status(response.responseCode).send(response);
    } catch (e: any) {
        const response = generateApiResponse(400, ResponseStatus.Error, 'Invalid Event.');
        res.status(response.responseCode).send(response);

        logger.error(`an error occurred while handling event ${event}`);
    }
});

export = router;
