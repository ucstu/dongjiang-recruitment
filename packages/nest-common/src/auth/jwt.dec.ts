import { SetMetadata } from "@nestjs/common";
import { User } from "./user.dto";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const PERMISSIONS_KEY = "permissions";
export const Permissions = (...permissions: User["permissions"]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
