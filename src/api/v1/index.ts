import { Hono } from 'hono';
import healthRouter from './health';
import mintRouter from './mint';

const router = new Hono();

router.route('/health', healthRouter);
router.route('/mint-nft', mintRouter);

export default router;
