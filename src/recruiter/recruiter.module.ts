import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { Recruiter } from './entities/recruiter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruiterRepository } from './recruiter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Recruiter])],
  controllers: [RecruiterController],
  providers: [RecruiterRepository, RecruiterService],
  exports: [RecruiterService],
})
export class RecruiterModule {}
