import { Context } from 'hono';
import { ApiResponse, ErrorResponse } from '../dto/response';

export class ResponseUtil {
  static success<T>(c: Context, data: T, message: string = 'Success'): Response {
    const response: ApiResponse<T> = {
      code: 200,
      message,
      data,
    };
    return c.json(response, 200);
  }
  
  static badRequest(c: Context, message: string = 'Bad request', errors?: any): Response {
    const response: ErrorResponse = {
      code: 400,
      message,
      errors,
    };
    return c.json(response, 400);
  }
  
  static unauthorized(c: Context, message: string = 'Unauthorized'): Response {
    const response: ErrorResponse = {
      code: 401,
      message,
    };
    return c.json(response, 401);
  }
  
  static forbidden(c: Context, message: string = 'Forbidden'): Response {
    const response: ErrorResponse = {
      code: 403,
      message,
    };
    return c.json(response, 403);
  }
  
  static notFound(c: Context, message: string = 'Not found'): Response {
    const response: ErrorResponse = {
      code: 404,
      message,
    };
    return c.json(response, 404);
  }
  
  static internalServerError(c: Context, message: string = 'Internal server error'): Response {
    const response: ErrorResponse = {
      code: 500,
      message,
    };
    return c.json(response, 500);
  }
}
