import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { PERMISSIONS_KEY } from "./jwt.dec";
import { User } from "./user.dto";

function getUserId<T>(data: T, paths: Array<string>): string {
  if (paths.length === 0) {
    return data as string;
  }
  if (paths.length === 1) {
    return data[paths[0] as keyof T] as string;
  }
  return getUserId(data, paths);
}

@Injectable()
export class JwtAuthInterceptor<T> implements NestInterceptor<T, T> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map<T, T>((data) => {
        const needSelfPermission = this.reflector
          .getAllAndOverride<User["permissions"]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
          ])
          ?.find((permission) => permission[1] === "SELF");
        if (!needSelfPermission) return data;
        const { user } = context.switchToHttp().getRequest<{ user: User }>();
        const paths = needSelfPermission[2].split(".");
        const userId = getUserId(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          "timestamp" in (data as any) ? (data as any).body : data,
          paths
        );
        if (user.userId === userId) return data;
        throw new ForbiddenException();
      })
    );
  }
}
