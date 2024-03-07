import { Test, TestingModule } from '@nestjs/testing';
import { AppliedJobService } from './applied_job.service';

describe('AppliedJobService', () => {
  let service: AppliedJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppliedJobService],
    }).compile();

    service = module.get<AppliedJobService>(AppliedJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
