/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdvertiserInformation = {
  description: `广告商信息`,
  properties: {
    advertiserInformationId: {
      type: "string",
      description: `广告商信息ID`,
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
    name: {
      type: "string",
      description: `广告商名称`,
      isRequired: true,
    },
    pageUrl: {
      type: "string",
      description: `网页地址`,
      isRequired: true,
    },
    logoUrl: {
      type: "string",
      description: `Logo地址`,
      isRequired: true,
    },
  },
} as const;
