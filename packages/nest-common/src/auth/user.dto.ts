export type ResourceActions = "CREATE" | "DELETE" | "UPDATE" | "QUERY";

export interface User {
  userId: string;
  permissions: Array<[string, ResourceActions] | [string, "SELF", string]>;
}
