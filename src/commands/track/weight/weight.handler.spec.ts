import { Test, TestingModule } from '@nestjs/testing';
import { WeightHandler } from './weight.handler';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';

describe('WeightHandler', () => {
  let service: WeightHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule()],
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
