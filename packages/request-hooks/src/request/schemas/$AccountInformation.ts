/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AccountInformation = {
  description: `账号信息`,
  properties: {
    accountInformationId: {
      type: "string",
      description: `账号信息ID`,
      isRequired: true,
    },
    createdAt: {
      type: "string",
      description: `创建时间`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `更新时间`,
      isRequired: true,
    },
    accountType: {
      type: "Enum",
      isRequired: true,
    },
    userName: {
      type: "string",
      description: `用户名`,
      isRequired: true,
    },
    fullInformationId: {
      type: "string",
      description: `详细信息ID`,
      isRequired: true,
    },
  },
} as const;
