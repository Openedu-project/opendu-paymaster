import { Context } from 'hono';
import { ResponseUtil } from '../utils/response';

export const healthController = {
  checkHealth: async (c: Context) => {
    return ResponseUtil.success(c, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'openedu-paymaster',
    });
  }
};
