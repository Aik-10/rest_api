import { WebServiceController } from "./Controllers/WebServiceController";
import { Config } from "./Utils/config";
import { logger } from "./Utils/logger";

on('onResourceStart', async (resourceName: string) => {
    if (resourceName !== GetCurrentResourceName()) return;

    try {
        const config = new Config();
        const valid = await config.validate();

        if (valid.status === 'error') {
            console.error(valid.errors?.message);
            return;
        }

        exports("RegisterRestApiEvent", config.RegisterRestApiEvent);
        exports("registerApiGet", config.RegisterRestApiGETEvent);
        new WebServiceController(config);
    } catch (e: any) {
        logger.error(e.message, e?.code);
    }
});