import { Challenge } from "@prisma/client";
import { AuthScope } from "../../helpers/auth/scopes";
import { Achievement } from "../achievements/achievement";
import { ChallengeViewModel } from "../challenges/challenge";

export interface UserLoginRequest {
  /**
   * @format email
   */
  email: string;

  password: string;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  scope: AuthScope;
}

export interface UserViewModelAchievements {
  id: number;
  name: string | null;

  /**
   * @format email
   */
  email: string;

  role: string;

  achievements: Achievement[]
}

export interface UserViewModelChallenges {
  id: number;
  name: string | null;

  /**
   * @format email
   */
  email: string;

  role: string;

  challenges: Challenge[]
}

export interface UserViewModel {
  id: number;
  name: string | null;

  /**
   * @format email
   */
  email: string;

  role: string;
}