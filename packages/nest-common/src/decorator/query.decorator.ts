import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import {
  Between,
  Equal,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from "../typeorm";

const methods = {
  $not: Not,
  $lt: LessThan,
  $lte: LessThanOrEqual,
  $gt: MoreThan,
  $gte: MoreThanOrEqual,
  $eq: Equal,
  $like: Like,
  $iLike: ILike,
  $between: Between,
  $in: In,
  $isnull: IsNull,
};

type Query<T = unknown> = {
  [k in keyof T]: [keyof typeof methods, ...Array<T[k]>];
};

type Operator = [keyof typeof methods, ...unknown[]];

const processOperator = (operator: Operator) => {
  const [method, ...args] = operator;

  switch (method) {
    case "$not":
      return methods[method](processOperator(args as Operator));
    case "$in":
      return methods[method].call(null, args);
    default:
      return methods[method].apply(null, args);
  }
};

export const QueryParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Array<FindOptionsWhere<unknown>> => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const queries = [request.query["query"]].filter(Boolean).flat();

    return queries.map((query) => {
      const _query = Object.entries(
        JSON.parse(query.toString()) as Query<unknown>
      ) as [keyof unknown, Operator][];
      return _query.reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: processOperator(value),
        };
      }, {} as FindOptionsWhere<unknown>);
    });
  }
);
