import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsArray,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MinLength(2, { message: 'position must have atleast 2 characters.' })
  @IsNotEmpty()
  position: string;

  @IsString()
  @MinLength(2, { message: 'job_description must have atleast 2 characters.' })
  @IsNotEmpty()
  job_description: string;

}
