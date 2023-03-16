/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdvertisingInformation = {
  description: `广告信息`,
  properties: {
    advertisingInformationId: {
      type: "string",
      description: `广告信息ID`,
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
      description: `广告名称`,
      isRequired: true,
    },
    pageUrl: {
      type: "string",
      description: `网页地址`,
      isRequired: true,
    },
    banner: {
      type: "string",
      description: `图片地址`,
      isRequired: true,
    },
    position: {
      type: "Enum",
      isRequired: true,
    },
    status: {
      type: "Enum",
      isRequired: true,
    },
    payed: {
      type: "Enum",
      isRequired: true,
    },
    startTime: {
      type: "string",
      description: `开始时间`,
      isRequired: true,
    },
    endTime: {
      type: "string",
      description: `结束时间`,
      isRequired: true,
    },
  },
} as const;
