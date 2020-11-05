import { Test, TestingModule } from '@nestjs/testing';
import { BodyMetricsService } from './body-metrics.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';

describe('BodyMetricsService', () => {
  let service: BodyMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule()],
      providers: [BodyMetricsService],
    }).compile();

    service = module.get<BodyMetricsService>(BodyMetricsService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
