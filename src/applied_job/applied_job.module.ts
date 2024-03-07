import { Module } from '@nestjs/common';
import { AppliedJobService } from './applied_job.service';
import { AppliedJobController } from './applied_job.controller';
import { AppliedJob } from './entities/applied_job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppliedJobRepository } from './applied_job.repository';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppliedJob]), JobModule],
  controllers: [AppliedJobController],
  providers: [AppliedJobRepository, AppliedJobService],
  exports: [AppliedJobService],
})
export class AppliedJobModule {}
