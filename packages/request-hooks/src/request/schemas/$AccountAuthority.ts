/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AccountAuthority = {
  description: `账号权限`,
  properties: {
    accountAuthorityId: {
      type: "string",
      description: `账号权限ID`,
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
    authorityName: {
      type: "string",
      description: `账号权限名称`,
      isRequired: true,
    },
  },
} as const;
