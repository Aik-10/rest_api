import { Router } from 'express';

import TriggerClientEvent from '~/Actions/TriggerClientEvent';
import TriggerServerEvent from '~/Actions/TriggerServerEvent';
import EventHandler from '~/Actions/EventHandler';

const router = Router();

router.use(TriggerClientEvent);
router.use(TriggerServerEvent);
router.use(EventHandler);

export default router;
