import { Test, TestingModule } from '@nestjs/testing';
import { AppliedJobController } from './applied_job.controller';
import { AppliedJobService } from './applied_job.service';

describe('AppliedJobController', () => {
  let controller: AppliedJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppliedJobController],
      providers: [AppliedJobService],
    }).compile();

    controller = module.get<AppliedJobController>(AppliedJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
