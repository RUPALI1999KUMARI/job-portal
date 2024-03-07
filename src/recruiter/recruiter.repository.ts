import { Repository } from 'typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class RecruiterRepository extends Repository<Recruiter> {
  constructor(
    @InjectRepository(Recruiter)
    private recruiterRepository: Repository<Recruiter>,
  ) {
    super(
      recruiterRepository.target,
      recruiterRepository.manager,
      recruiterRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Recruiter[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Recruiter | null> {
    return this.findOneBy({ id: id });
  }
}
