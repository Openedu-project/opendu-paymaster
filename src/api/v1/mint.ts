import { Hono } from 'hono';
import { mintController } from '../../controllers';
import { authMiddleware } from '../../middleware/auth';

const router = new Hono();

router.post('/', authMiddleware, mintController.mintNFT);

export default router;
