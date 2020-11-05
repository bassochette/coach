import { Document } from 'mongoose';

export interface WeightLog {
  memberDiscordId: string;
  weightInKg: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface WeightLogDocument extends WeightLog, Document {}

export interface MemberWeight {
  memberDiscordId: string;
  currentInKg: number;
  historic: number[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface MemberWeightDocument extends MemberWeight, Document {}

export interface WeightVariation {
  lastWeightInKg: number;
  currentWeightInKg: number;
  variation: number;
  historic?: number[];
}
