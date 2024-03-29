import { PrismaClient, Prisma } from "@prisma/client";
import { ChallengeType } from "../src/types/challenges/challenge";

const prisma = new PrismaClient();

const challengeUnitsData: Prisma.ChallengeUnitCreateInput[] = [
  {
    title: "Km",
  },
];

const challengesData: any = {
  [challengeUnitsData[0].title]: {
    title: "Bėgimo iššūkis",
    description:
      "Šis iššūkis buvo sukurtas iš seeder'io, kad patikrintume, ar viskas veikia",
    isActive: true,
    endAt: new Date("2023-03-25 12:38:23.277"),
    goalCount: 999,
    type: ChallengeType.GoalMax,
  },
};

async function main() {
  console.log(`Start seeding Challenges...`);

  for (const data of challengeUnitsData) {
    const challengeUnit = await prisma.challengeUnit.create({ data });

    const challenge = await prisma.challenge.create({
      data: {
        ...challengesData[challengeUnit.title],
        unit: {
          connect: {
            id: challengeUnit.id,
          },
        },
      },
      include: {
        unit: true,
      },
    });

    console.log(
      `Created a challenge with unit '${challenge.unit.title}' and id: ${challenge.id}`
    );
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
