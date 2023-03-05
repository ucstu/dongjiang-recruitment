import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export interface Pagination {
  page: number;
  size: number;
  sort: Array<[string, "ASC" | "DESC"]>;
}

export const Page = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pagination => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const page = +[request.query["page"]].flat()[0] || 0;
    const size = +[request.query["size"]].flat()[0] || 5;
    const sort = [request.query["sort"]].flat() as Array<string>;

    return {
      page,
      size,
      sort: sort.map((_sort) => _sort.split(",") as [string, "ASC" | "DESC"]),
    };
  }
);
