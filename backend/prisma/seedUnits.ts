import { PrismaClient, Prisma } from "@prisma/client";
import { ChallengeType } from "../src/types/challenges/challenge";

const prisma = new PrismaClient();

const challengeUnitsData: Prisma.ChallengeUnitCreateInput[] = [
  {
    title: "Km",
  },
  {
    title: "m",
  },
  {
    title: "s",
  },
  {
    title: "el_gain",
  },
];

async function main() {
  console.log(`Start seeding Challenge unit types...`);

  for (const data of challengeUnitsData) {
    const challengeUnit = await prisma.challengeUnit.create({ data });

    console.log(`Created a challenge unit type ${challengeUnit.title}`);
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
