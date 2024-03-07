import { Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { RecruiterRepository } from './recruiter.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruiter } from './entities/recruiter.entity';

@Injectable()
export class RecruiterService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: RecruiterRepository,
  ) {}

  /**
   * this is function is used to create Recruiter in Recruiter Entity.
   * @param createRecruiterDto this will type of createRecruiterDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createRecruiter(createRecruiterDto: CreateRecruiterDto): Promise<Recruiter> {
    const recruiter: Recruiter = new Recruiter();
    recruiter.name = createRecruiterDto.name;
    recruiter.email = createRecruiterDto.email;
    recruiter.company = createRecruiterDto.company;
    recruiter.password = createRecruiterDto.password;
    return this.recruiterRepository.save(recruiter);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllRecruiter(): Promise<Recruiter[]> {
    return this.recruiterRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewRecruiter(id: number): Promise<Recruiter> {
    return this.recruiterRepository.findOneBy({ id });
  }

  async getRecruiterByEmail(email: string): Promise<Recruiter | undefined> {
    return this.recruiterRepository.findOneBy({ email });
  }
}
