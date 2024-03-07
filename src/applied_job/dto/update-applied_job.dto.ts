import { PartialType } from '@nestjs/mapped-types';
import { CreateAppliedJobDto } from './create-applied_job.dto';

export class UpdateAppliedJobDto extends PartialType(CreateAppliedJobDto) {}
