import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  WeightLogDocument,
  MemberWeightDocument,
  MemberWeight,
  WeightVariation,
} from './weight.interfaces';

@Injectable()
export class WeightService {
  constructor(
    @InjectModel('WeightLog')
    private readonly weightLogModel: Model<WeightLogDocument>,
    @InjectModel('MemberWeight')
    private readonly memberWeightModel: Model<MemberWeightDocument>,
  ) {}

  async getMemberWeight(
    memberDiscordId: string,
    weightInKg: number,
  ): Promise<MemberWeightDocument> {
    const memberWeight = await this.memberWeightModel.findOne({
      memberDiscordId,
    });
    if (!memberWeight) {
      return this.memberWeightModel.create({
        memberDiscordId,
        currentInKg: weightInKg,
        initialInKg: weightInKg,
      });
    }
    return memberWeight;
  }

  async logWeight(
    memberDiscordId: string,
    weightInKg: number,
  ): Promise<WeightVariation> {
    const memberWeight = await this.getMemberWeight(
      memberDiscordId,
      weightInKg,
    );

    const variation: WeightVariation = {
      lastWeightInKg: memberWeight.currentInKg,
      currentWeightInKg: weightInKg,
      variation: weightInKg - memberWeight.currentInKg,
    };

    memberWeight.currentInKg = weightInKg;
    await memberWeight.save();
    await this.weightLogModel.create({ memberDiscordId, weightInKg });

    return variation;
  }
}
