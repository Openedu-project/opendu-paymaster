import { Hono } from 'hono';
import { mintController } from '../../controllers';

const router = new Hono();

router.post('/', mintController.mintNFT);

export default router;
