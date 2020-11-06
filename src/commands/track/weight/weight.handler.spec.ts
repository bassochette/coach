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

  beforeEach(() => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract parameters from the message', () => {
    expect(service.extractParameters('track weight 75.63kg')).toMatchObject({
      rawWeight: '75.63',
    });
    expect(service.extractParameters('track weight 75,63kg')).toMatchObject({
      rawWeight: '75,63',
    });
    expect(service.extractParameters('track weight 75.63')).toMatchObject({
      rawWeight: '75.63',
    });
    expect(service.extractParameters('track weight 75,63')).toMatchObject({
      rawWeight: '75,63',
    });
  });

  it('should parse and transform weight from message into the correct number', () => {
    expect(service.transformRawWeight('102.56')).toEqual(102.56);
    expect(service.transformRawWeight('102,56')).toEqual(102.56);
  });
});
