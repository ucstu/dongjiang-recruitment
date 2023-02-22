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
    userName: {
      type: "string",
      description: `用户名`,
      isRequired: true,
    },
    fullInformationId: {
      description: `详细信息ID`,
      properties: {
        manager: {
          type: "string",
          description: `管理员信息`,
          isRequired: true,
        },
        applicant: {
          type: "string",
          description: `求职者信息`,
          isRequired: true,
        },
        personnel: {
          type: "string",
          description: `人事信息`,
          isRequired: true,
        },
        advertiser: {
          type: "string",
          description: `广告商信息`,
          isRequired: true,
        },
      },
      isRequired: true,
    },
  },
} as const;
