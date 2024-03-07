import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('job')
@UseGuards(AuthGuard('jwt'))
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Request() req, @Body() createJobDto: CreateJobDto) {
    const recruiter = req.user;
    return this.jobService.createJob(createJobDto, recruiter.userId);
  }

  @Get()
  findAll(@Query() params: any) {
    if (params.query) {
      return this.jobService.findAllJobs();
    } else {
      return this.jobService.searchJobs(params.tag || "");

    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.viewJob(+id);
  }

}
