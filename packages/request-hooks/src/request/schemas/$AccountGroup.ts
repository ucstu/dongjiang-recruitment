/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AccountGroup = {
  description: `账号群组`,
  properties: {
    accountGroupId: {
      type: "string",
      description: `账号群组ID`,
      isRequired: true,
    },
    createdAt: {
      type: "string",
      description: `创建时间`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `修改时间`,
      isRequired: true,
    },
    groupName: {
      type: "string",
      description: `账号组名称`,
      isRequired: true,
    },
  },
} as const;
