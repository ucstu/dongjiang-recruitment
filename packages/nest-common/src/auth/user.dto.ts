import { RequestMethod } from "@nestjs/common";

export interface User {
  userId: string;
  permissions?: Array<[string, RequestMethod]>;
}
