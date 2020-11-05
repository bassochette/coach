import { Test, TestingModule } from '@nestjs/testing';
import { WeightHandler } from './weight.handler';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { BodyMetricsModule } from '../../../body-metrics/body-metrics.module';

describe('WeightHandler', () => {
  let service: WeightHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), BodyMetricsModule],
      providers: [WeightHandler],
    }).compile();

    service = module.get<WeightHandler>(WeightHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
