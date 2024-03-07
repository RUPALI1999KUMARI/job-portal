import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  /**
   * this is function is used to create Candidate in Candidate Entity.
   * @param createCandidateDto this will type of createCandidateDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createCandidate(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const candidate: Candidate = new Candidate();
    candidate.name = createCandidateDto.name;
    candidate.email = createCandidateDto.email;
    candidate.password = createCandidateDto.password;
    return this.candidateRepository.save(candidate);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllCandidate(): Promise<Candidate[]> {
    return this.candidateRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewCandidate(id: number): Promise<Candidate> {
    return this.candidateRepository.findOneBy({ id });
  }

  async getCandidateByEmail(email: string): Promise<Candidate | undefined> {
    return this.candidateRepository.findOneBy({ email });
  }
}
