export interface Achievement {
  id?: number;
  title: string;
  imagePath: string;
  description: string;
  max_users: number;
  type: AchievementType;
}

export enum AchievementType {
  Winner = "Winner",
  Participant = "Participant",
}
