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

  it('should respond to track weight or weight or poid or rtrack poid', () => {
    expect(service.test('track weight 52')).toBeTruthy();
    expect(service.test('TrAck Weight 78kg')).toBeTruthy();
    expect(service.test('weight 23')).toBeTruthy();
    expect(service.test('track poid 52kg')).toBeTruthy();
    expect(service.test('poid 78kg')).toBeTruthy();

    expect(service.test('only if starting with track weight 23')).toBeFalsy();
    expect(service.test('track weight')).toBeFalsy();
    expect(service.test('weight')).toBeFalsy();
    expect(service.test('track poid')).toBeFalsy();
    expect(service.test('poid')).toBeFalsy();
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
