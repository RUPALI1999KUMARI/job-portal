import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { ArrayContains } from 'class-validator';

@Injectable()
export class JobService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  /**
   * this is function is used to create Job in Job Entity.
   * @param createJobDto this will type of createJobDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createJob(createJobDto: CreateJobDto, recruiterId: number): Promise<Job> {
    const job: Job = new Job();
    job.recruiter_id = recruiterId;
    job.position = createJobDto.position;
    job.job_description = createJobDto.job_description;
    return this.jobRepository.save(job);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewJob(id: number): Promise<Job> {
    return this.jobRepository.findOneBy({ id });
  }

  searchJobs(tag: string): Promise<Job[]> {        
    return this.jobRepository.find({
      where: {
        job_description: Like(`%${tag}%`)
      }
    });

  }
}
