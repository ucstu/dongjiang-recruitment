/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PageResponse = {
  description: `分页响应`,
  properties: {
    requestId: {
      type: "string",
      description: `请求ID`,
    },
    timestamp: {
      type: "string",
      description: `响应时间`,
      isRequired: true,
    },
    status: {
      type: "number",
      description: `响应编码`,
      isRequired: true,
    },
    message: {
      type: "string",
      description: `响应信息`,
      isRequired: true,
    },
    body: {
      description: `响应体`,
      properties: {
        totalCount: {
          type: "number",
          description: `记录总数`,
          isRequired: true,
        },
        items: {
          type: "array",
          contains: {
            type: "string",
          },
          isRequired: true,
        },
      },
      isRequired: true,
    },
  },
} as const;
