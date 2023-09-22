import { Router } from 'express';

import TriggerClientEvent from '~/Actions/TriggerClientEvent';
import TriggerServerEvent from '~/Actions/TriggerServerEvent';
import EventHandler from '~/Actions/EventHandler';
import RequestGETHandler from '~/Actions/RequestGETHandler';

const router = Router();

router.use(TriggerClientEvent);
router.use(TriggerServerEvent);
router.use(EventHandler);
router.use(RequestGETHandler);

export default router;
