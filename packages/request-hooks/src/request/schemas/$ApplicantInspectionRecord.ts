/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ApplicantInspectionRecord = {
  description: `求职者查看记录`,
  properties: {
    applicantInspectionRecordId: {
      type: "string",
      description: `求职者查看记录ID`,
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
    positionInformationId: {
      type: "string",
      description: `职位信息ID`,
      isRequired: true,
    },
  },
} as const;
