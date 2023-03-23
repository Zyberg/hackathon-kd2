import { prisma } from "../src/boot/prisma";

async function CheckChallengesComplete() {
  console.log("Start checking the Challenges for completion...");


  const challenges = await prisma.challenge.findMany();

  for (let challenge of challenges) {
    if (challenge.endAt < new Date()) {
        // TODO: award achievements, prizes etc.

        await prisma.challenge.update({
            where: {
                id: challenge.id
            },
            data: {
                isComplete: true,
            }
        })
    }
  }

  console.log("Finished checking all Challenges!");
}

CheckChallengesComplete();
