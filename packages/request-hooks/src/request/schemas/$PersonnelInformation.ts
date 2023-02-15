/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PersonnelInformation = {
  description: `人事信息`,
  properties: {
    personnelInformationId: {
      type: "string",
      description: `人事信息ID`,
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
    companyInformationId: {
      type: "string",
      description: `公司信息ID`,
      isRequired: true,
    },
    avatarUrl: {
      type: "string",
      description: `头像地址`,
      isRequired: true,
    },
    hrName: {
      type: "string",
      description: `HR姓名`,
      isRequired: true,
    },
    postName: {
      type: "string",
      description: `职位名称`,
      isRequired: true,
    },
    acceptEmail: {
      type: "string",
      description: `电子邮箱`,
      isRequired: true,
    },
  },
} as const;
