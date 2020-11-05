import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { WeightService } from './weight.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';
import { MemberWeightSchema, WeightLogSchema } from './weight.model';

describe('WeightService', () => {
  let service: WeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'WeightLog', schema: WeightLogSchema },
          { name: 'MemberWeight', schema: MemberWeightSchema },
        ]),
      ],
      providers: [WeightService],
    }).compile();

    service = module.get<WeightService>(WeightService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
