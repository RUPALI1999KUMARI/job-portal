import { Injectable } from '@nestjs/common';
import { CandidateService } from '../candidate/candidate.service';
import { RecruiterService } from '../recruiter/recruiter.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private candidateService: CandidateService,
    private recruiterService: RecruiterService,
    private jwtService: JwtService,
  ) {}

  async validateCandidate(email: string, pass: string): Promise<any> {
    const user = await this.candidateService.getCandidateByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateRecruiter(email: string, pass: string): Promise<any> {
    const recruiter = await this.recruiterService.getRecruiterByEmail(email);
    if (recruiter && recruiter.password === pass) {
      const { password, ...result } = recruiter;
      return result;
    }
    return null;
  }

  async login(user: any, userType: string) {
    let  payload = { name: user.name, email: user.email, userType, userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      userType,
    };
  }
}
