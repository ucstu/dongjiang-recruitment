import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigType } from "../config";
import _authorizationConfig from "../config/authorization.config";
import { JwtAuthGuard } from "./jwt.guard";
import { JwtAuthInterceptor } from "./jwt.interceptor";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [_authorizationConfig.KEY],
      useFactory(authorizationConfig: ConfigType<typeof _authorizationConfig>) {
        return {
          secret: authorizationConfig.secret,
          signOptions: {
            expiresIn: authorizationConfig.expiresIn,
          },
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtAuthInterceptor,
    },
  ],
})
export default class {}

export * from "@nestjs/jwt";
export * from "@nestjs/passport";
export {
  authenticate,
  AuthenticateCallback,
  AuthenticateOptions,
  Authenticator,
  authorize,
  AuthorizeCallback,
  deserializeUser,
  DeserializeUserFunction,
  DoneCallback,
  Framework,
  framework,
  initialize,
  InitializeOptions,
  LogInOptions,
  LogOutOptions,
  Passport,
  PassportStatic,
  Profile,
  serializeUser,
  session,
  SessionOptions as AuthSessionOptions,
  SessionStrategy,
  SessionStrategyOptions,
  strategies,
  Strategy,
  StrategyCreated,
  StrategyCreatedStatic,
  StrategyFailure,
  transformAuthInfo,
  unuse,
  use,
} from "passport";
export * from "passport-jwt";
export * from "./jwt.dec";
export * from "./jwt.guard";
export * from "./jwt.interceptor";
export * from "./jwt.strategy";
export * from "./user.dto";
