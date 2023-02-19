import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { IS_PUBLIC_KEY, PERMISSIONS_KEY } from "./jwt.dec";
import { User } from "./user.dto";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const publicCanActive = Boolean(
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    );
    if (publicCanActive) return publicCanActive;

    await super.canActivate(context);

    const { user } = context
      .switchToHttp()
      .getRequest<Request & { user: User }>();

    const permissionCanActive = Boolean(
      this.reflector
        .getAllAndOverride<User["permissions"]>(PERMISSIONS_KEY, [
          context.getHandler(),
          context.getClass(),
        ])
        ?.some(([reqScope, reqAction]) =>
          user.permissions?.some(([hasScope, hasAction]) => {
            return reqScope === hasScope && reqAction === hasAction;
          })
        ) ?? true
    );
    if (permissionCanActive) return permissionCanActive;
  }
}
