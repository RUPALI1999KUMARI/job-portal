import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { JobModule } from './job/job.module';
import { AppliedJobModule } from './applied_job/applied_job.module';
import { Candidate } from './candidate/entities/candidate.entity';
import { Recruiter } from './recruiter/entities/recruiter.entity';
import { Job } from './job/entities/job.entity';
import { AppliedJob } from './applied_job/entities/applied_job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Candidate, Recruiter, Job, AppliedJob],
      synchronize: true,
    }),
    AuthModule,
    CandidateModule,
    RecruiterModule,
    JobModule,
    AppliedJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
