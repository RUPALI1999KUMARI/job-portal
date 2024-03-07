import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppliedJobService } from './applied_job.service';
import { CreateAppliedJobDto } from './dto/create-applied_job.dto';
import { UpdateAppliedJobDto } from './dto/update-applied_job.dto';
import { AuthGuard } from '@nestjs/passport';
import { JobService } from 'src/job/job.service';

@Controller('applied-job')
@UseGuards(AuthGuard('jwt'))
export class AppliedJobController {
  constructor(private readonly appliedJobService: AppliedJobService,
    private readonly jobService: JobService) {}

  @Post()
  async create(@Request() req, @Body() createAppliedJobDto: CreateAppliedJobDto) {
    const candidate = req.user;
    if (candidate.userType != 'candidate') {
      return { success: false, message: "Invalid request"}
    }
    const alreadyApplied = await this.appliedJobService.findCandidateAndJobId(candidate.userId, createAppliedJobDto.job_id);
    
    if (alreadyApplied) {
      return { success: false, message: "Candidate has already applied for the job"};
    }

    const job = await this.jobService.viewJob(createAppliedJobDto.job_id)
    if (!job) {
      return { success: false, message: "Job does not exist"};
    }

    return this.appliedJobService.createAppliedJob(createAppliedJobDto, candidate.userId);
  }

  @Get('view-job-applications/:job_id')
  async jobApplications(@Request() req, @Param('job_id') job_id: string) {
    const recruiter = req.user;
    if (recruiter.userType != 'recruiter') {
      return { success: false, message: "Invalid request"}
    }
    const job = await this.jobService.viewJob(+job_id)
    if (job.recruiter_id != recruiter.userId) {
      return { success: false, message: "Invalid request"}
    }
    return this.appliedJobService.findAllSubmissions(+job_id);
  }

  @Get('view-candidate-applications')
  candidateApplications(@Request() req) {
    const candidate = req.user;
    if (candidate.userType != 'candidate') {
      return { success: false, message: "Invalid request"}
    }
    return this.appliedJobService.findAllAppliedJobs(candidate.userId);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAppliedJobDto: UpdateAppliedJobDto) {
  //   return this.appliedJobService.update(+id, updateAppliedJobDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.appliedJobService.remove(+id);
  // }
}
