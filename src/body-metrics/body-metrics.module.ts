import { Module } from '@nestjs/common';
import { BodyMetricsService } from './body-metrics.service';
import { WeightModule } from './weight/weight.module';

@Module({
  providers: [BodyMetricsService],
  imports: [WeightModule],
  exports: [WeightModule],
})
export class BodyMetricsModule {}
