/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FilterInformation = {
  description: `筛选信息`,
  properties: {
    occupationalBreakdown: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    expectedSalary: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    workExperience: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    education: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    natureWork: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    companySize: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    financingStage: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
    industryField: {
      type: "array",
      contains: {
        type: "string",
      },
      isRequired: true,
    },
  },
} as const;
