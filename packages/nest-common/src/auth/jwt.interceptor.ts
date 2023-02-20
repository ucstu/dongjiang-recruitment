import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { OWNER_PERMISSION_KEY } from "./jwt.dec";
import { User } from "./user.dto";

@Injectable()
export class JwtAuthInterceptor<T> implements NestInterceptor<T, T> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map<T, T>((data) => {
        const ownerPermissionCallBack = this.reflector.getAllAndOverride<
          (data: T) => string | number
        >(OWNER_PERMISSION_KEY, [context.getHandler(), context.getClass()]);

        if (ownerPermissionCallBack) {
          const { user } = context
            .switchToHttp()
            .getRequest<Request & { user: User }>();
          if (user.userId !== ownerPermissionCallBack(data)) {
            throw new ForbiddenException();
          }
        }

        return data;
      })
    );
  }
}
