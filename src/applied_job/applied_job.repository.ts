import { Repository } from 'typeorm';
import { AppliedJob } from './entities/applied_job.entity';
import { CreateAppliedJobDto } from './dto/create-applied_job.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class AppliedJobRepository extends Repository<AppliedJob> {
  constructor(
    @InjectRepository(AppliedJob)
    private appliedJobRepository: Repository<AppliedJob>,
  ) {
    super(
      appliedJobRepository.target,
      appliedJobRepository.manager,
      appliedJobRepository.queryRunner,
    );
  }

  public async findAll(): Promise<AppliedJob[]> {
    return this.find();
  }

  public async findById(id: number): Promise<AppliedJob | null> {
    return this.findOneBy({ id: id });
  }
}
