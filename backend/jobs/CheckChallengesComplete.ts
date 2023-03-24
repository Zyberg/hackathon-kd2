import { prisma } from "../src/boot/prisma";
import { AchievementType } from "../src/types/achievements/achievement";
import EmailService from "../src/utility/mail/EmailService";
import EmailBuilder from "../src/utility/mail/EmailBuilder";

async function CheckChallengesComplete() {
  console.log("Start checking the Challenges for completion...");

  const challenges = await prisma.challenge.findMany();

  for (let challenge of challenges) {
    if (challenge.endAt < new Date()) {
      const achievementWinner = await prisma.achievement.create({
        data: {
          title: `Winner of '${challenge.title}'`,
          description: `Winner trophy for the challenge '${challenge.title}'`,
          imagePath: "",
          type: AchievementType.Winner,
          max_users: 1,
        },
      });

      const achievementParticipation = await prisma.achievement.create({
        data: {
          title: `Participated in '${challenge.title}'`,
          description: `Participant trophy for the challenge '${challenge.title}'`,
          imagePath: "",
          type: AchievementType.Participant,
          max_users: -1,
        },
      });

      const challengeCompleted = await prisma.challenge.update({
        where: {
          id: challenge.id,
        },
        data: {
          isComplete: true,
          // TODO award achievements, prizes etc.
        },
        include: {
          participants: {
            include: {
              user: {
                include: {
                  achievements: {
                    include: {
                      achievement: true,
                    },
                  },
                },
              },
              userPoints: true,
            },
          },
        },
      });

      for (let participant of challengeCompleted.participants) {
        if (participant.userPoints.length === 0) continue;

        const points =
          participant.userPoints[participant.userPoints.length - 1].value;

        //TODO: different types
        if (challengeCompleted.goalCount < points) {
          await prisma.user.update({
            where: {
              id: participant.userId,
            },
            data: {
              achievements: {
                create: [
                  {
                    achievementId: achievementWinner.id,
                  },
                ],
              },
            },
          });

          const data = await EmailBuilder.makeChallengeCompleteSuccessEmail(
            "nikolajus.elkana@gmail.com",
            participant.user.email,
            "Challenge complete",
            challenge.title
          );

          await EmailService.sendEmail(data);
        } else {
          await prisma.user.update({
            where: {
              id: participant.userId,
            },
            data: {
              achievements: {
                create: [
                  {
                    achievementId: achievementParticipation.id,
                  },
                ],
              },
            },
          });

          const data = await EmailBuilder.makeChallengeCompleteFailureEmail(
            "nikolajus.elkana@gmail.com",
            participant.user.email,
            "Challenge complete",
            challenge.title
          );

          await EmailService.sendEmail(data);
        }
      }
    }
  }

  console.log("Finished checking all Challenges!");
}

CheckChallengesComplete();
