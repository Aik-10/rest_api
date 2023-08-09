import cors from "cors";
import express, { Express, Request, Response } from 'express';
import { Config } from "~/Utils/config";
import { logger } from '~/Utils/logger';
import { ResponseStatus, generateApiResponse } from '~/Utils/response';
import RouteController from './RouteController'
import { handleVerifySignature } from "./SignatureVerification";

export class WebServiceController {
    public app: Express;
    private readonly config: Config;

    constructor(config: Config) {
        this.config = config;

        this.startWebService();
    }

    public async startWebService(): Promise<void> {
        const { port, enableCors, accessToken } = this.config.config.server;

        this.app = express();

        if (enableCors) {
            this.app.use(cors());
            logger.info('CORS is enabled for all requests.');
        }

        if (!accessToken) {
            logger.info('No access keys provided. The server is running with unrestricted access.');
            return;
        }

        this.app.use(async (req: Request, res: Response, next: any) => {

            if (!req.headers || !req.headers['x-access-key']) {
                const response = generateApiResponse(400, ResponseStatus.Error, 'Authorized header was not provided.');
                logger.info(`${req.socket.remoteAddress} - Authorized header was not provided`);
                res.status(response.responseCode).send(response);
                return;
            }

            if (! await handleVerifySignature(req, accessToken)) {
                logger.info(`${req.socket.remoteAddress} - Unauthorized user / invalid access token`);
                const response = generateApiResponse(
                    401,
                    ResponseStatus.Error,
                    'Unauthorized user.',
                );

                res.status(response.responseCode).send(response);
                return;
            }

            next();
        });

        this.app.use(RouteController);

        this.app.use((_, res) => {
            const response = generateApiResponse(404, ResponseStatus.Error, 'Endpoint does not exist.');
            res.status(response.responseCode).send(response);
        });

        this.app.listen(port, () => {
            logger.info(`REST API listening on http://127.0.0.1:${port}/`);
            emit(`${GetCurrentResourceName()}:WebSocket:started`);
        });
    }
}
