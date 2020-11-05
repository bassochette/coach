import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WeightLogSchema, MemberWeightSchema } from './weight.model';
import { WeightService } from './weight.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WeightLog', schema: WeightLogSchema },
      { name: 'MemberWeight', schema: MemberWeightSchema },
    ]),
  ],
  providers: [WeightService],
  exports: [WeightService],
})
export class WeightModule {}
