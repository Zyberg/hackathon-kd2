import { challengeUnit } from "../challengeUnits/challengeUnit"

export interface ChallengeViewModel {
  id: number;
  title: string;
  // TODO: fill in the rest
}

export interface ChallengeCreateModel {
  title: string;
  description: string;
  isActive: boolean;
  unitId: number;
}
