import { challengeUnit } from "../challengeUnits/challengeUnit"

export interface ChallengeViewModel {
  id: number;
  title: string;
  description: string;
  unitId: number;
  startAt: Date;
  endAt: Date;
  goalCount: number;
  type: ChallengeType;
  isActive: boolean;
  isComplete: boolean;
  parentId: number | null;
  participants: any
}

export enum ChallengeType {
  GoalMax = 'GoalMax',
  GoalCount = 'GoalCount',
}

export interface ChallengeCreateModel {
  title: string;
  description: string;
  isActive: boolean;
  unitId: number;
  startAt?: Date;
  endAt: Date;
  goalCount: number;
  type: ChallengeType;
  parentId: number | null;
}

export interface ChallengeUpdateModel {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  unitId: number;
  startAt: Date;
  endAt: Date;
  goalCount: number;
  type: ChallengeType;
  parentId: number | null;
  isComplete: boolean;
}
