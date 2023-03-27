import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkExperienceDto } from "./dto/create-workExperience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-workExperience.dto";
import { WorkExperience } from "./entities/workExperience.entity";

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>
  ) {}

  async create(
    applicantId: string,
    createWorkExperienceDto: CreateWorkExperienceDto
  ) {
    return await this.workExperienceRepository.save({
      ...createWorkExperienceDto,
      applicantId,
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<WorkExperience>>,
    { page, size, sort }: Pagination<WorkExperience>
  ) {
    return {
      total: await this.workExperienceRepository.count({
        where: query.map((q) => ({ ...q, applicantId })),
      }),
      items: await this.workExperienceRepository.find({
        where: { ...query, applicantId },
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(applicantId: string, id: string) {
    const workExperience = await this.workExperienceRepository.findOne({
      where: { applicantId, id },
    });
    if (!workExperience) throw new NotFoundException();
    return workExperience;
  }

  async update(
    applicantId: string,
    id: string,
    updateWorkExperienceDto: UpdateWorkExperienceDto
  ) {
    const workExperience = { ...updateWorkExperienceDto, applicantId, id };
    const { affected } = await this.workExperienceRepository.update(
      id,
      workExperience
    );
    if (!affected) throw new NotFoundException();
    return workExperience;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.workExperienceRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
