import { Hono } from 'hono';
import { healthController } from '../../controllers';

const router = new Hono();

router.get('/', healthController.checkHealth);

export default router;
