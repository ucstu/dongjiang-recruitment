/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AttentionRecord = {
  description: `关注记录`,
  properties: {
    attentionRecordId: {
      type: "string",
      description: `关注记录ID`,
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
    userInformationId: {
      type: "string",
      description: `用户信息ID`,
      isRequired: true,
    },
    companyInformationId: {
      type: "string",
      description: `公司信息ID`,
      isRequired: true,
    },
  },
} as const;
