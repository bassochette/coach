import { Schema } from 'mongoose';

export const WeightLogSchema = new Schema(
  {
    memberDiscordId: String,
    weightInKg: Number,
  },
  {
    timestamps: true,
  },
);

export const MemberWeightSchema = new Schema(
  {
    memberDiscordId: String,
    currentInKg: Number,
    initialInKg: Number,
  },
  {
    timestamps: true,
  },
);
