import { Injectable } from '@nestjs/common';
import { CreateAppliedJobDto } from './dto/create-applied_job.dto';
import { UpdateAppliedJobDto } from './dto/update-applied_job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppliedJob } from './entities/applied_job.entity';

@Injectable()
export class AppliedJobService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(AppliedJob)
    private readonly appliedJobRepository: Repository<AppliedJob>,
  ) {}

  /**
   * this is function is used to create AppliedJob in AppliedJob Entity.
   * @param createAppliedJobDto this will type of createAppliedJobDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createAppliedJob(
    createAppliedJobDto: CreateAppliedJobDto,
    candidateId: number
  ): Promise<AppliedJob> {
    const appliedJob: AppliedJob = new AppliedJob();
    appliedJob.candidate_id = candidateId;
    appliedJob.job_id = createAppliedJobDto.job_id;

    return this.appliedJobRepository.save(appliedJob);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllAppliedJobs(candidateId: number): Promise<AppliedJob[]> {
    return this.appliedJobRepository.find({
      where: {
        candidate_id: candidateId
      }
    });
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  findAllSubmissions(job_id: number): Promise<AppliedJob[]> {
    return this.appliedJobRepository.find({ where: { job_id } });
  }

  findCandidateAndJobId(candidateId: number, jobId: number) {
    return this.appliedJobRepository.findOne({
      where: [
        {
          job_id: jobId,
          candidate_id: candidateId
        }
      ]
    });

  }
}
