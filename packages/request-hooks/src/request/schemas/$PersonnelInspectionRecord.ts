/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PersonnelInspectionRecord = {
  description: `人事查看记录`,
  properties: {
    personnelInspectionRecordId: {
      type: "string",
      description: `人事查看记录ID`,
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
    hrInformationId: {
      type: "string",
      description: `HR信息ID`,
      isRequired: true,
    },
    userInformationId: {
      type: "string",
      description: `用户信息ID`,
      isRequired: true,
    },
  },
} as const;
