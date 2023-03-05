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
    const ctxResponse = ctx.getResponse<Response<_Response<never>>>();
    const ctxRequest = ctx.getRequest<Request>();

    const exceptionName = exception.name;
    const exceptionStatus = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    ctxResponse.status(exception.getStatus()).json({
      requestId: ctxRequest.params["reqid"],
      timestamp: new Date().toISOString(),
      status: exceptionStatus,
      message: exceptionName,
      error:
        typeof exceptionResponse === "string"
          ? exceptionResponse
          : (exceptionResponse["message"] as Array<string>),
    });
  }
}
