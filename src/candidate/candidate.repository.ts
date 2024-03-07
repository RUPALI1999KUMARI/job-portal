import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class CandidateRepository extends Repository<Candidate> {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {
    super(
      candidateRepository.target,
      candidateRepository.manager,
      candidateRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Candidate[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Candidate | null> {
    return this.findOneBy({ id: id });
  }
}
