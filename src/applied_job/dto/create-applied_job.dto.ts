import { IsInt } from 'class-validator';

export class CreateAppliedJobDto {

  @IsInt()
  job_id: number;
}
