/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";

import { ApplicantService } from "./services/ApplicantService";
import { ApplicantAttentionRecordService } from "./services/ApplicantAttentionRecordService";
import { ApplicantDeliveryRecordService } from "./services/ApplicantDeliveryRecordService";
import { ApplicantEducationExperienceService } from "./services/ApplicantEducationExperienceService";
import { ApplicantGarnerRecordService } from "./services/ApplicantGarnerRecordService";
import { ApplicantInspectionRecordService } from "./services/ApplicantInspectionRecordService";
import { ApplicantJobExpectationService } from "./services/ApplicantJobExpectationService";
import { ApplicantProjectExperienceService } from "./services/ApplicantProjectExperienceService";
import { ApplicantWorkExperienceService } from "./services/ApplicantWorkExperienceService";
import { AuthenticationService } from "./services/AuthenticationService";
import { CommonService } from "./services/CommonService";
import { CompanyService } from "./services/CompanyService";
import { CompanyPositionInformationService } from "./services/CompanyPositionInformationService";
import { ManagerAccountService } from "./services/ManagerAccountService";
import { ManagerAccountauthoritiesService } from "./services/ManagerAccountauthoritiesService";
import { ManagerAccountGroupService } from "./services/ManagerAccountGroupService";
import { PersonnelService } from "./services/PersonnelService";
import { PersonnelInspectionRecordService } from "./services/PersonnelInspectionRecordService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {
  public readonly applicant: ApplicantService;
  public readonly applicantAttentionRecord: ApplicantAttentionRecordService;
  public readonly applicantDeliveryRecord: ApplicantDeliveryRecordService;
  public readonly applicantEducationExperience: ApplicantEducationExperienceService;
  public readonly applicantGarnerRecord: ApplicantGarnerRecordService;
  public readonly applicantInspectionRecord: ApplicantInspectionRecordService;
  public readonly applicantJobExpectation: ApplicantJobExpectationService;
  public readonly applicantProjectExperience: ApplicantProjectExperienceService;
  public readonly applicantWorkExperience: ApplicantWorkExperienceService;
  public readonly authentication: AuthenticationService;
  public readonly common: CommonService;
  public readonly company: CompanyService;
  public readonly companyPositionInformation: CompanyPositionInformationService;
  public readonly managerAccount: ManagerAccountService;
  public readonly managerAccountauthorities: ManagerAccountauthoritiesService;
  public readonly managerAccountGroup: ManagerAccountGroupService;
  public readonly personnel: PersonnelService;
  public readonly personnelInspectionRecord: PersonnelInspectionRecordService;

  public readonly request: BaseHttpRequest;

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "1.0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.applicant = new ApplicantService(this.request);
    this.applicantAttentionRecord = new ApplicantAttentionRecordService(
      this.request
    );
    this.applicantDeliveryRecord = new ApplicantDeliveryRecordService(
      this.request
    );
    this.applicantEducationExperience = new ApplicantEducationExperienceService(
      this.request
    );
    this.applicantGarnerRecord = new ApplicantGarnerRecordService(this.request);
    this.applicantInspectionRecord = new ApplicantInspectionRecordService(
      this.request
    );
    this.applicantJobExpectation = new ApplicantJobExpectationService(
      this.request
    );
    this.applicantProjectExperience = new ApplicantProjectExperienceService(
      this.request
    );
    this.applicantWorkExperience = new ApplicantWorkExperienceService(
      this.request
    );
    this.authentication = new AuthenticationService(this.request);
    this.common = new CommonService(this.request);
    this.company = new CompanyService(this.request);
    this.companyPositionInformation = new CompanyPositionInformationService(
      this.request
    );
    this.managerAccount = new ManagerAccountService(this.request);
    this.managerAccountauthorities = new ManagerAccountauthoritiesService(
      this.request
    );
    this.managerAccountGroup = new ManagerAccountGroupService(this.request);
    this.personnel = new PersonnelService(this.request);
    this.personnelInspectionRecord = new PersonnelInspectionRecordService(
      this.request
    );
  }
}
