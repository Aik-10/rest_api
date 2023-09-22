import { logger, type LoggerLevels } from './logger';
import { GetServerConvar } from './GetServerConvar';
import { ActiveEvents, ActiveGETEvents } from './ActiveEvents';

type ResourceConfig = {
    server: {
        port: number;
        enableCors: boolean;
        accessToken: string;
    };
    logger: {
        level: LoggerLevels;
    };
};

export class Config {
    public config: ResourceConfig;

    private async build(): Promise<ResourceConfig> {
        const accessToken = await GetServerConvar({ type: 'api:accessToken', default_: null });
        if (!accessToken || accessToken == '') {
            throw new Error(`Invalid access token.`);
        }

        return {
            server: {
                port: Number(await GetServerConvar({ type: 'api:port', default_: 4290 })),
                enableCors: Boolean(await GetServerConvar({ type: 'api:enableCors', default_: false })),
                accessToken: accessToken,
            },
            logger: {
                level: await GetServerConvar({ type: 'api:logLevel', default_: 'info' }),
            }
        }
    }

    public async validate(): Promise<ConfigValidationResponse> {
        try {
            this.config = await this.build();
            return { status: 'success' };
        } catch (err: any) {
            return {
                status: 'error',
                errors: err,
            };
        }
    }

    public async RegisterRestApiEvent(eventName: string, cb: (playerId: number, ...args: Array<T>) => any) {
        if (ActiveEvents[eventName]) {
            ActiveEvents[eventName] = cb;
            logger.info(`Event "${eventName}" already registered, but callback rewrited`);
            return;
        }

        ActiveEvents[eventName] = cb;

        logger.info(`Event "${eventName}" registered, RegisterResource: ${GetInvokingResource()}!`);
    }
    
    public async RegisterRestApiGETEvent(eventName: string, cb: (...args: T) => T) {

        if (ActiveGETEvents[eventName]) {
            ActiveGETEvents[eventName] = cb;
            logger.info(`GET event "${eventName}" already registered, but callback rewrited`);
            return;
        }

        ActiveGETEvents[eventName] = cb;

        logger.info(`GET event "${eventName}" registered, RegisterResource: ${GetInvokingResource()}!`);
    }
}
