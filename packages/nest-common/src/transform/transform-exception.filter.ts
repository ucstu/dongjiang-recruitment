import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Response as _Response } from "./response.dto";

@Catch(HttpException)
export class TransformExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<_Response<never>>>();
    const request = ctx.getRequest<Request>();

    response.status(exception.getStatus()).json({
      requestId: request.params["reqid"],
      timestamp: new Date().toISOString(),
      status: exception.getStatus(),
      message: exception.name,
      error: exception.message,
    });
  }
}
