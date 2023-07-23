import { Router, Request, Response } from 'express';
import { logger } from '~/Utils/logger';
import { ResponseStatus, generateApiResponse } from '~/Utils/response';

const router = Router();
router.post('/TriggerClientEvent/:event/:source', async (req: Request, res: Response): Promise<T> => {
    const event = req.params.event;
    const source: number = Number(req.params.source);
    const args: Array<string> | undefined = req.query.arg as Array<string>;

    try {
        if (!event) {
            throw new Error(`Invalid event: ${event}`);
        }

        if (!GetPlayerName(String(source))) {
            throw new Error(`Invalid source: ${source}`);
        }

        args ? emitNet(event, source, ...args) : emitNet(event, source);
        const response = generateApiResponse(200, ResponseStatus.Success, `TriggerClientEvent("${event}", ${source}${args !== undefined ? "," + args.toString() : ''}) Triggered`);

        logger.info(`TriggerClientEvent("${event}", ${source}${args !== undefined ? "," + args.toString() : ''}) triggered with ${req.socket.remoteAddress}`);

        res.status(response.responseCode).send(response);
    } catch (e: any) {
        const response = generateApiResponse(400, ResponseStatus.Error, e.message);
        res.status(response.responseCode).send(response);

        logger.error(`an error occurred while handling event ${event}`);
    }
});

export = router;
